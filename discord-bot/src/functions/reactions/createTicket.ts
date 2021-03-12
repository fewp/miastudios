import { Guild, GuildMember, TextChannel } from "discord.js";
import {
  APPLICATIONS_PARENT_CHANNEL,
  NORMAL_COMMISSIONS_PARENT_CHANNEL,
  NORMAL_SUPPORT_PARENT_CHANNEL,
  PRIORITY_SUPPORT_PARENT_CHANNEL,
  PRIORITY_TICKETS_PARENT_CHANNEL,
  PRIORITY_TICKET_CHANNEL,
} from "../../assets/Channels";
import {
  APPLICATION_EMOJI,
  ARROWRIGHT_EMOJI,
  COMMISSION_EMOJI,
  LOGO_EMOJI,
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
import { createOldTicket } from "../../db/resolvers/oldTicket";
import {
  createTicket,
  deleteTicket,
  getTicket,
} from "../../db/resolvers/ticket";
import { FunctionResponse } from "../../types";
import log from "../../utils/betterLogger";
import buildEmbed from "../../utils/buildEmbed";

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
  alias: "Ticket Creation",
  async run(
    member: GuildMember,
    guild: Guild,
    reaction: any
  ): Promise<FunctionResponse> {
    const oldTicket = await getTicket(member.id);
    if (oldTicket) {
      const hasChannel = await guild.channels.cache.get(oldTicket.channelId);

      if (hasChannel) {
        const privateMessageEmbed = buildEmbed(
          `${LOGO_EMOJI.text} Ticket Creation Failed`,
          `You already have a **${oldTicket.type}** ticket channel.
          Please use that instead.
        
        ${ARROWRIGHT_EMOJI.text} <#${oldTicket.channelId}>
        `,
          null,
          this.alias,
          true
        );
        await member.send(privateMessageEmbed);
        return {
          status: false,
          message: ["User already has a ticket channel"],
        };
      } else {
        log(`[ADDED] Ticket ${oldTicket.id} added to "old_ticket" table`);
        await createOldTicket(
          oldTicket.owner,
          oldTicket.channelId,
          oldTicket.type
        );
        log(`[DELETED] Ticket ${oldTicket.id} deleted from "ticket" table`);
        await deleteTicket(oldTicket.id);
      }
    }

    let ticketType: string = "";
    let parentChannel: string = "";

    // getting ticketType and parentChannel
    switch (reaction._emoji.id) {
      // if it is a commission ticket
      case COMMISSION_EMOJI.id:
        // checking if it is a priority commission or just a regular one
        if (reaction.message.channel.id === PRIORITY_TICKET_CHANNEL) {
          ticketType = "Priority Commission";
          parentChannel = PRIORITY_TICKETS_PARENT_CHANNEL;
        } else {
          ticketType = "Commission";
          parentChannel = NORMAL_COMMISSIONS_PARENT_CHANNEL;
        }
        break;
      // if it is a support ticket
      case SUPPORT_EMOJI.id:
        // checking if it is priority support or just a regular support
        if (reaction.message.channel.id === PRIORITY_TICKET_CHANNEL) {
          ticketType = "Priority Support";
          parentChannel = PRIORITY_SUPPORT_PARENT_CHANNEL;
        } else {
          ticketType = "Support";
          parentChannel = NORMAL_SUPPORT_PARENT_CHANNEL;
        }
        break;
      // if it is an application ticket
      case APPLICATION_EMOJI.id:
        // application has no priority channel, so no need for another if statement
        ticketType = "Application";
        parentChannel = APPLICATIONS_PARENT_CHANNEL;
        break;
    }

    // clearing the user's displayName
    const nickname: string = member.displayName
      .replace(/[^a-zA-Z0-9]/g, "")
      .toLowerCase();

    // creating the ticket in db

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
        // await c.overwritePermissions([

        // adding it to the right category
        await c.setParent(parentChannel);

        // setting the channel's topic
        await c.setTopic(`<@${member.id}>'s ${ticketType} ticket.`);

        // pinging the user (so he know the channel was succesfully created)
        await c.send(`<@${member.id}>`).then((m) => {
          m.delete({ timeout: 1 });
        });

        try {
          createTicket(member.id, c.id, ticketType);
        } catch (error) {
          return {
            status: false,
            message: error,
          };
        }

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
