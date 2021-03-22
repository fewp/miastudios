import { ARROWRIGHT_EMOJI, LOGO_EMOJI } from "../assets/Emojis";
import { FunctionResponse } from "../types";
import buildEmbed from "../utils/buildEmbed";

module.exports = {
  name: "invite",
  alias: "Ticket Invitation",
  description: "Invites a member to the ticket",
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
      VIEW_CHANNEL: true,
      SEND_MESSAGES: true,
      READ_MESSAGE_HISTORY: true,
    });

    await msg.channel.send(`<@${user.id}>`).then((m: any) => {
      m.delete({ timeout: 1 });
    });

    const embed = await buildEmbed(
      `${LOGO_EMOJI.text} User invited!`,
      `${ARROWRIGHT_EMOJI.text} <@${user.id}> was invited and is now able to use this channel.`,
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
