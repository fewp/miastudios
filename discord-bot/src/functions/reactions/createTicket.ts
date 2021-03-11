import { Guild, GuildMember, TextChannel } from "discord.js";
import {
  APPLICATION_TICKET_PARENT_CHANNEL,
  COMMISSION_TICKET_PARENT_CHANNEL,
  PRIORITY_COMMISSION_TICKET_PARENT_CHANNEL,
  PRIORITY_SUPPORT_TICKET_PARENT_CHANNEL,
  PRIORITY_TICKET_CHANNEL,
  SUPPORT_TICKET_PARENT_CHANNEL,
} from "../../assets/Channels";
import {
  APPLICATION_EMOJI,
  COMMISSION_EMOJI,
  SUPPORT_EMOJI,
} from "../../assets/Emojis";
import {
  APPLICATION_TICKET_MESSAGE,
  COMMISSION_TICKET_MESSAGE,
  PRIORITY_COMMISSION_TICKET_MESSAGE,
  PRIORITY_SUPPORT_TICKET_MESSAGE,
  SUPPORT_TICKET_MESSAGE,
} from "../../assets/Messages";
import { EVERYONE_ROLE_ID, MANAGEMENT_ROLE_ID } from "../../assets/Roles";
import { FunctionResponse } from "../../types";

module.exports = {
  name: "CreateTicket",
  description: "Creates a ticket for a specific user",
  message: "ticket",
  messages: [
    SUPPORT_TICKET_MESSAGE,
    APPLICATION_TICKET_MESSAGE,
    COMMISSION_TICKET_MESSAGE,
    PRIORITY_COMMISSION_TICKET_MESSAGE,
    PRIORITY_SUPPORT_TICKET_MESSAGE,
  ],
  async run(
    member: GuildMember,
    guild: Guild,
    reaction: any
  ): Promise<FunctionResponse> {
    let ticketType: string = "";
    let parentChannel: string = "";

    console.log("reaction._emoji.id: ", reaction._emoji.id);
    console.log("reaction.message.channel.id: ", reaction.message.channel.id);
    console.log("COMMISSION_EMOJI.id: ", COMMISSION_EMOJI.id);
    console.log("APPLICATION_EMOJI.id: ", APPLICATION_EMOJI.id);
    console.log("SUPPORT_EMOJI.id: ", SUPPORT_EMOJI.id);
    console.log("member.id: ", member.id);

    switch (reaction._emoji.id) {
      // if it is a commission ticket
      case COMMISSION_EMOJI.id:
        // checking if it is a priority commission or just a regular one
        if (reaction.message.channel.id === PRIORITY_TICKET_CHANNEL) {
          ticketType = "Priority Commission";
          parentChannel = PRIORITY_COMMISSION_TICKET_PARENT_CHANNEL;
        } else {
          ticketType = "Commission";
          parentChannel = COMMISSION_TICKET_PARENT_CHANNEL;
        }
        break;
      // if it is a support ticket
      case SUPPORT_EMOJI.id:
        // checking if it is priority support or just a regular support
        if (reaction.message.channel.id === PRIORITY_TICKET_CHANNEL) {
          ticketType = "Priority Support";
          parentChannel = PRIORITY_SUPPORT_TICKET_PARENT_CHANNEL;
        } else {
          ticketType = "Support";
          parentChannel = SUPPORT_TICKET_PARENT_CHANNEL;
        }
        break;
      // if it is an application ticket
      case APPLICATION_EMOJI.id:
        // application has no priority channel, so no need for another if statement
        ticketType = "Application";
        parentChannel = APPLICATION_TICKET_PARENT_CHANNEL;
        break;
    }

    const nickname: string = member.displayName
      .replace(/[^a-zA-Z0-9]/g, "")
      .toLowerCase();

    await guild.channels
      .create(`💬│ticket-${nickname}`, {
        type: "text",
        permissionOverwrites: [
          {
            id: MANAGEMENT_ROLE_ID,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
          },
          {
            id: member.id,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
          },
          {
            id: EVERYONE_ROLE_ID,
            deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
          },
        ],
      })
      .then(async (c: TextChannel) => {
        // adding it to the right category
        await c.setParent(parentChannel);

        // setting the channel's topic
        await c.setTopic(`<@${member.id}>'s ${ticketType} ticket.`);

        // pinging the user (so he know the channel was succesfully created)
        await c.send(`<@${member.id}>`).then((m) => {
          m.delete({ timeout: 1 });
        });

        return {
          status: true,
          message: [`TICKET CREATED ${member.nickname}`],
        };
      });

    return {
      status: true,
      message: [""],
    };
  },
};
