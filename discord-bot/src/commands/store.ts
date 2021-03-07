import { STORE_CHANNEL } from "../assets/Channels";
import { FunctionResponse } from "../types";
import buildEmbed from "../utils/buildEmbed";
import checkArguments from "../utils/checkArguments";
import getCorrectUsage from "../utils/getCorrectUsage";

module.exports = {
  name: "Store",
  description: 'Sends a "Store" message to the #store channel',
  // a * in front of an argument means it has to be an URL
  argumentsSchema: ["Title", "Price", "Dimensions", "Render", "*Image URL"],
  isMultiWord: true, // if the arguments need to be separated by ""
  run(msg: any, args: string): FunctionResponse {
    const argumentsResponse = checkArguments(
      args,
      this.argumentsSchema,
      this.isMultiWord
    );

    // means it has returned an error
    if (argumentsResponse.hasOwnProperty("status")) {
      const errorMessage = (argumentsResponse as FunctionResponse).message[0];
      const errorEmbed = buildEmbed(
        "Error!",
        `${errorMessage}
        
        Correct usage: 
        ${getCorrectUsage(this.argumentsSchema, this.name)}`,
        null,
        this.name
      );

      // sends feedback to the administrator
      msg.channel.send(errorEmbed);

      // returns error message so it can be logged
      return {
        status: false,
        message: [errorMessage],
      };
    }

    const storeChannel = msg.channel.guild.channels.cache.get(STORE_CHANNEL);
    // ["Title", "Client", "Dimensions", "Render", "*Image URL"],

    const embed = buildEmbed(
      null,
      `**${(argumentsResponse as string[])[0]}**\nPrice: ${
        (argumentsResponse as string[])[1]
      }\nDimensions: ${(argumentsResponse as string[])[2]}\nRender: ${
        (argumentsResponse as string[])[3]
      }`,
      (argumentsResponse as string[])[4],
      this.name
    );

    storeChannel.send(embed);

    return {
      status: true,
      message: null,
    };
  },
};
