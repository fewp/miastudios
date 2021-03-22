import { ARROWRIGHT_EMOJI, LOGO_EMOJI } from "../assets/Emojis";
import { FunctionResponse } from "../types";
import buildEmbed from "../utils/buildEmbed";

module.exports = {
  name: "quote",
  alias: "Quote",
  description: "Sends a message containing information about the project",
  permissionRequired: ["MANAGER"],
  argumentsSchema: null,
  isMultiWord: false, // if the arguments need to be separated by ""
  async run(msg: any, _args: string[]): Promise<FunctionResponse> {
    // building the embed
    const embed = buildEmbed(
      `${LOGO_EMOJI.text} Quote Information`,
      `Items to quote your project:

    ${ARROWRIGHT_EMOJI.text} Type of construction (Lobby, spawn, arena, etc.)
    ${ARROWRIGHT_EMOJI.text} Size (100x100, 500x500, 1000x1000, etc)
    ${ARROWRIGHT_EMOJI.text} Theme
    ${ARROWRIGHT_EMOJI.text} Reference image
    ${ARROWRIGHT_EMOJI.text} Specific constructions (warps, stores, etc.) and quantity
    ${ARROWRIGHT_EMOJI.text} Minimum / maximum budget
    ${ARROWRIGHT_EMOJI.text} Level of detail (with interior, underground, etc.)`,
      null,
      this.alias,
      true
    );

    // sending the message to the announcements channel
    await msg.channel.send(embed);

    return {
      status: true,
      message: null,
    };
  },
};
