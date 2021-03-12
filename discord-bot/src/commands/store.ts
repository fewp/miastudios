import { STORE_CHANNEL } from "../assets/Channels";
import { FunctionResponse } from "../types";
import buildEmbed from "../utils/buildEmbed";

module.exports = {
  name: "Store",
  description: 'Sends a "Store" message to the #store channel',
  // a * in front of an argument means it has to be an URL
  argumentsSchema: ["Title", "Price", "Dimensions", "Render", "*Image URL"],
  permissionRequired: "MANAGER",
  isMultiWord: true, // if the arguments need to be separated by ""
  async run(msg: any, args: string[]): Promise<FunctionResponse> {
    const storeChannel = await msg.channel.guild.channels.cache.get(
      STORE_CHANNEL
    );

    const embed = buildEmbed(
      null,
      `**${args[0]}**\nPrice: ${args[1]}\nDimensions: ${args[2]}\nRender: ${args[3]}`,
      args[4],
      this.name,
      true
    );

    await storeChannel.send(embed);

    return {
      status: true,
      message: null,
    };
  },
};
