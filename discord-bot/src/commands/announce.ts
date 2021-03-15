import { ANNOUNCEMENTS_CHANNEL } from "../assets/Channels";
import { FunctionResponse } from "../types";
import buildEmbed from "../utils/buildEmbed";

module.exports = {
  name: "Announce",
  alias: "Announcements",
  description: "Sends an announcement to the #announcements channel",
  permissionRequired: ["MANAGER"],
  argumentsSchema: ["Title", "Message"],
  isMultiWord: true, // if the arguments need to be separated by ""
  async run(msg: any, args: string[]): Promise<FunctionResponse> {
    // getting the announcements channel
    const announcementsChannel = await msg.channel.guild.channels.cache.get(
      ANNOUNCEMENTS_CHANNEL
    );
    // ["Title", "Client", "Dimensions", "Render", "*Image URL"],

    // building announcement embed
    const embed = buildEmbed(args[0], args[1], null, this.alias, true);

    // sending the message to the announcements channel
    await announcementsChannel.send(embed);

    return {
      status: true,
      message: null,
    };
  },
};
