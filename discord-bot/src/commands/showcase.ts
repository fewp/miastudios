import { SHOWCASE_CHANNEL } from "../assets/Channels";
import { FunctionResponse } from "../types";
import buildEmbed from "../utils/buildEmbed";

module.exports = {
  name: "Showcase",
  description: "Sends a showcase to the #showcases channel",
  // a * in front of an argument means it has to be an URL
  argumentsSchema: ["Title", "Client", "Dimensions", "Render", "*Image URL"],
  isMultiWord: true, // if the arguments need to be separated by ""
  permissionRequired: "MANAGER",
  async run(msg: any, args: string[]): Promise<FunctionResponse> {
    const showcaseChannel = await msg.channel.guild.channels.cache.get(
      SHOWCASE_CHANNEL
    );

    const embed = buildEmbed(
      null,
      `**${args[0]}**\nClient: ${args[1]}\nDimensions: ${args[2]}\nRender: ${args[3]}`,
      args[4],
      this.name,
      true
    );

    await showcaseChannel.send(embed);

    return {
      status: true,
      message: null,
    };
  },
};
