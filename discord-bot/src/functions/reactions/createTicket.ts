import { Guild, GuildMember } from "discord.js";
import { SUPPORT_TICKET_MESSAGE } from "../../assets/Messages";
import { FunctionResponse } from "../../types";

module.exports = {
  name: "CreateTicket",
  description: "Creates a ticket for a specific user",
  message: SUPPORT_TICKET_MESSAGE,
  async run(
    member: GuildMember,
    guild: Guild,
    reactionId: any
  ): Promise<FunctionResponse> {
    let ticketType: string = "";
    let parentChannel: string = "";

    console.log("reactionId", reactionId);

    // switch (reactionId) {
    //   case APPLICATION_EMOJI:
    //     ticketType = "Application";
    //     parentChannel = APPLICATION_TICKET_PARENT_CHANNEL;
    //     break;
    //   case SUPPORT_EMOJI:
    //     ticketType = "Support";
    //     parentChannel = SUPPORT_TICKET_PARENT_CHANNEL;

    //     break;
    //   case COMMISSION_EMOJI:
    //     ticketType = "Commission";
    //     parentChannel = APPLICATION_TICKET_PARENT_CHANNEL;
    //     break;
    // }

    // guild.channels
    //   .create(`💬│ticket-${name}`, {
    //     type: "text",
    //     permissionOverwrites: [
    //       {
    //         id: MANAGEMENT_ROLE_ID,
    //         allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
    //       },
    //       {
    //         id: member.id,
    //         allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
    //       },
    //       {
    //         id: EVERYONE_ROLE_ID,
    //         deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
    //       },
    //     ],
    //   })
    //   .then(async (c) => {
    //     c.setParent();
    //     c.setTopic(`<@${member.id}>'s ${ticketType} ticket.`);
    //     c.send(`<@${member.id}>`).then((m) => {
    //       m.delete({ timeout: 1 });
    //     });
    //     return {
    //       status: true,
    //       message: [`TICKET CREATED ${member.nickname}`],
    //     };
    //   });

    return {
      status: true,
      message: [""],
    };
  },
};
