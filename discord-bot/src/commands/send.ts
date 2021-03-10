import { TERMS_OF_SERVICE_CHANNEL, TICKET_CHANNEL } from "../assets/Channels";
import {
  APPLICATION_TICKET_EMBED,
  COMMISSION_TICKET_EMBED,
  SUPPORT_TICKET_EMBED,
  TERMS_OF_SERVICE_EMBED,
} from "../assets/Embeds";
import {
  APPLICATION_EMOJI,
  CHECKMARK_EMOJI,
  COMMISSION_EMOJI,
  SUPPORT_EMOJI,
} from "../assets/Emojis";
import { FunctionResponse } from "../types";
import buildEmbed from "../utils/buildEmbed";
import checkArguments from "../utils/checkArguments";
import getCorrectUsage from "../utils/getCorrectUsage";

module.exports = {
  name: "Send",
  description: "Sends a pre-built embed to the specificated channel",
  // a * in front of an argument means it has to be an URL
  argumentsSchema: ["Name"],
  isMultiWord: false, // if the arguments need to be separated by ""
  async run(msg: any, args: string): Promise<FunctionResponse> {
    const argumentsResponse = checkArguments(
      args,
      this.argumentsSchema,
      this.isMultiWord
    );

    // means it has returned an error
    if (
      argumentsResponse.hasOwnProperty("status") &&
      (argumentsResponse as FunctionResponse).status === false
    ) {
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

    let errorMessage: string[] = [""];

    switch (args) {
      case "ticket":
        const ticketChannel = await msg.guild.channels.cache.get(
          TICKET_CHANNEL
        );
        await ticketChannel
          .send(await buildEmbed.apply(this, COMMISSION_TICKET_EMBED))
          .then((m: any) => {
            m.react(COMMISSION_EMOJI.id);
          });
        await ticketChannel
          .send(await buildEmbed.apply(this, SUPPORT_TICKET_EMBED))
          .then((m: any) => {
            m.react(SUPPORT_EMOJI.id);
          });
        await ticketChannel
          .send(await buildEmbed.apply(this, APPLICATION_TICKET_EMBED))
          .then((m: any) => {
            m.react(APPLICATION_EMOJI.id);
          });
        break;
      case "tos":
        await msg.guild.channels.cache
          .get(TERMS_OF_SERVICE_CHANNEL)
          .send(await buildEmbed.apply(this, TERMS_OF_SERVICE_EMBED))
          .then((m: any) => {
            m.react(CHECKMARK_EMOJI.id);
          });
        break;
    }

    return {
      status: true,
      message: null,
    };
  },
};
