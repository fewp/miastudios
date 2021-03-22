import {
  APPLICATIONS_PARENT_CHANNEL,
  NORMAL_COMMISSIONS_PARENT_CHANNEL,
  NORMAL_SUPPORT_PARENT_CHANNEL,
  PRIORITY_SUPPORT_PARENT_CHANNEL,
  PRIORITY_TICKETS_PARENT_CHANNEL,
} from "../assets/Channels";
import { ARROWRIGHT_EMOJI, LOGO_EMOJI } from "../assets/Emojis";
import { getTicketByChannelId, updateTicket } from "../db/resolvers/ticket";
import { FunctionResponse } from "../types";
import buildEmbed from "../utils/buildEmbed";
import capitalize from "../utils/capitalizeString";

module.exports = {
  name: "change",
  alias: "Change",
  description:
    "Changes a ticket channel type and moves it to the designated category",
  permissionRequired: ["MANAGER", "DEVELOPER"],
  argumentsSchema: ["Category"],
  isMultiWord: false, // if the arguments need to be separated by ""
  async run(msg: any, args: string): Promise<FunctionResponse> {
    let response: FunctionResponse = null;
    let parentChannel: string = "";

    switch (args.toLowerCase()) {
      case "commission":
        parentChannel = NORMAL_COMMISSIONS_PARENT_CHANNEL;
        break;
      case "pcommission":
        parentChannel = PRIORITY_TICKETS_PARENT_CHANNEL;
        break;
      case "support":
        parentChannel = NORMAL_SUPPORT_PARENT_CHANNEL;
        break;
      case "psupport":
        parentChannel = PRIORITY_SUPPORT_PARENT_CHANNEL;
        break;
      case "application":
        parentChannel = APPLICATIONS_PARENT_CHANNEL;
        break;

      default:
        // incorrect usage (invalid argument)
        const embed = buildEmbed(
          `${LOGO_EMOJI.text} Change Categories`,
          `Available categories:
  
          ${ARROWRIGHT_EMOJI.text} Commission
          ${ARROWRIGHT_EMOJI.text} Support
          ${ARROWRIGHT_EMOJI.text} Application,
          ${ARROWRIGHT_EMOJI.text} PCommission
          ${ARROWRIGHT_EMOJI.text} PSupport`,
          null,
          this.alias,
          true
        );

        await msg.channel.send(embed);
        response = {
          status: false,
          message: ["Invalid argument"],
        };

        break;
    }
    // if it fell in the default case
    if (response) return response;

    const ticket = await getTicketByChannelId(msg.channel.id);

    await msg.channel.setParent(parentChannel);
    await msg.channel.setTopic(
      `<@${ticket.owner}>'s ${capitalize(args)} ticket.`
    );

    const updateResponse = await updateTicket(ticket.id, capitalize(args));

    if (updateResponse === false)
      return {
        status: false,
        message: ["Unable to update ticket"],
      };

    return {
      status: true,
      message: null,
    };
  },
};
