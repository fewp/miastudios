import { ARROW_RIGHT_EMOJI, LOGO_EMOJI } from "../assets/Emojis";
import { FunctionResponse } from "../types";
import buildEmbed from "../utils/buildEmbed";

module.exports = {
  name: "quote",
  alias: "Quote",
  description: "Sends a message containing information about the project",
  permissionRequired: "MANAGER",
  argumentsSchema: null,
  isMultiWord: false, // if the arguments need to be separated by ""
  async run(msg: any, _args: string[]): Promise<FunctionResponse> {
    // building the embed
    const embed = buildEmbed(
      `${LOGO_EMOJI.text} Quote Information`,
      `Items to quote your project:

    ${ARROW_RIGHT_EMOJI.text} Type of construction (Lobby, spawn, arena, etc.)
    ${ARROW_RIGHT_EMOJI.text} Size (100x100, 500x500, 1000x1000, etc)
    ${ARROW_RIGHT_EMOJI.text} Theme
    ${ARROW_RIGHT_EMOJI.text} Reference image
    ${ARROW_RIGHT_EMOJI.text} Specific constructions (warps, stores, etc.) and quantity
    ${ARROW_RIGHT_EMOJI.text} Minimum / maximum budget
    ${ARROW_RIGHT_EMOJI.text} Level of detail (with interior, underground, etc.)`,
      null,
      this.alias
    );

    // sending the message to the announcements channel
    await msg.channel.send(embed);

    return {
      status: true,
      message: null,
    };
  },
};
