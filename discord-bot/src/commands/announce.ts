import { ANNOUNCEMENTS_CHANNEL } from "../assets/Channels";
import { FunctionResponse } from "../types";
import buildEmbed from "../utils/buildEmbed";
import checkArguments from "../utils/checkArguments";
import getCorrectUsage from "../utils/getCorrectUsage";

module.exports = {
  name: "Announce",
  alias: "Announcements",
  description: "Sends an announcement to the #announcements channel",
  // a * in front of an argument means it has to be an URL
  argumentsSchema: ["Title", "Message"],
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
        this.alias
      );

      // sends feedback to the administrator
      msg.channel.send(errorEmbed);

      // returns error message so it can be logged
      return {
        status: false,
        message: [errorMessage],
      };
    }

    const announcementsChannel = msg.channel.guild.channels.cache.get(
      ANNOUNCEMENTS_CHANNEL
    );
    // ["Title", "Client", "Dimensions", "Render", "*Image URL"],

    const embed = buildEmbed(
      (argumentsResponse as string[])[0],
      (argumentsResponse as string[])[1],
      null,
      this.alias
    );

    announcementsChannel.send(embed);

    return {
      status: true,
      message: null,
    };
  },
};
