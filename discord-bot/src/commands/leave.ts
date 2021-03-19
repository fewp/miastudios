import { ARROWRIGHT_EMOJI, LOGO_EMOJI } from "../assets/Emojis";
import { getTicketByChannelId } from "../db/resolvers/ticket";
import { FunctionResponse } from "../types";
import buildEmbed from "../utils/buildEmbed";

module.exports = {
  name: "leave",
  alias: "Ticket leave",
  description: "Removes the caller from the ticket",
  permissionRequired: null,
  argumentsSchema: null,
  isMultiWord: false, // if the arguments need to be separated by ""
  async run(msg: any, _args: string): Promise<FunctionResponse> {
    const ticket = await getTicketByChannelId(msg.channel.id);

    if (!ticket) {
      const errorMessage: string = "Unable to retrieve ticket from Database";

      const embed = await buildEmbed(
        `${LOGO_EMOJI.text} Error!`,
        `${ARROWRIGHT_EMOJI.text} ${errorMessage}`,
        null,
        this.alias,
        true
      );

      await msg.channel.send(embed);

      return {
        status: false,
        message: [errorMessage],
      };
    } else if (ticket.owner === msg.author.id) {
      const closeCommand: string = "`close`";
      const embed = await buildEmbed(
        `${LOGO_EMOJI.text} Error!`,
        `${ARROWRIGHT_EMOJI.text} A ticket owner can't leave it's own ticket, use ${process.env.PREFIX}${closeCommand} instead.`,
        null,
        this.alias,
        true
      );

      await msg.channel.send(embed);

      return {
        status: false,
        message: ["Ticket owner tried leaving it's own channel"],
      };
    }

    await msg.channel.updateOverwrite(msg.author.id, {
      VIEW_CHANNEL: false,
      SEND_MESSAGES: false,
      READ_MESSAGE_HISTORY: false,
    });

    const embed = await buildEmbed(
      `${LOGO_EMOJI.text} User left!`,
      `${ARROWRIGHT_EMOJI.text} <@${msg.author.id}> has left the ticket.`,
      null,
      this.alias,
      true
    );

    msg.channel.send(embed);

    return {
      status: true,
      message: null,
    };
  },
};
