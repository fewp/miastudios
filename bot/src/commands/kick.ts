import { ARROWRIGHT_EMOJI, LOGO_EMOJI } from "../assets/Emojis";
import { FunctionResponse } from "../types";
import buildEmbed from "../utils/buildEmbed";

module.exports = {
  name: "kick",
  alias: "Ticket Kick",
  description: "Removes someone from the ticket",
  permissionRequired: ["MANAGER", "TICKETOWNER"],
  argumentsSchema: ["<@User>"],
  isMultiWord: false, // if the arguments need to be separated by ""
  async run(msg: any, args: string): Promise<FunctionResponse> {
    let user: any;

    try {
      user = await msg.channel.guild.members.cache.get(
        args.replace(/[^a-zA-Z0-9]/g, "") // user id
      );
    } catch (error) {
      return {
        status: false,
        message: [error],
      };
    }

    if (!user) {
      const errorEmbed = await buildEmbed(
        `${LOGO_EMOJI.text} Error!`,
        `${args} is not a valid user.`,
        null,
        this.alias,
        true
      );
      await msg.channel.send(errorEmbed);
      return {
        status: false,
        message: ["Invalid user"],
      };
    }

    await msg.channel.updateOverwrite(user.id, {
      VIEW_CHANNEL: false,
      SEND_MESSAGES: false,
      READ_MESSAGE_HISTORY: false,
    });

    const embed = await buildEmbed(
      `${LOGO_EMOJI.text} User kicked!`,
      `${ARROWRIGHT_EMOJI.text} <@${user.id}> was kicked.`,
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
