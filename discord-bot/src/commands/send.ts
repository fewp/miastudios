import {
  CREATE_A_TICKET_CHANNEL,
  INFORMATION_CHANNEL,
  INFORMATION_MIRROR_CHANNEL,
  PRIORITY_TICKET_CHANNEL,
} from "../assets/Channels";
import {
  INFORMATION_EMBED,
  PRIORITY_TICKET_EMBEDS,
  PRIORITY_TICKET_EMOJIS,
  REGULAR_TICKET_EMBEDS,
  REGULAR_TICKET_EMOJIS,
  TERMS_OF_SERVICE_EMBEDS,
} from "../assets/Embeds";
import {
  CHECK_EMOJI,
  INVITED_EMOJI,
  OTHER_EMOJI,
  TWITTER_EMOJI,
  YOUTUBE_EMOJI,
} from "../assets/Emojis";
import { FunctionResponse } from "../types";
import buildEmbed from "../utils/buildEmbed";

module.exports = {
  name: "Send",
  alias: "Send",
  description: "Sends a pre-built embed to the specificated channel",
  argumentsSchema: ["Message"],
  permissionRequired: ["DEVELOPER"],
  isMultiWord: false, // if the arguments need to be separated by ""
  async run(msg: any, args: string): Promise<FunctionResponse> {
    // default permissions
    const guild = msg.guild;

    switch (args) {
      case "ticket":
        REGULAR_TICKET_EMBEDS.forEach(async (embed: any, index: number) => {
          const ticketsChannel = await guild.channels.cache.get(
            CREATE_A_TICKET_CHANNEL
          );
          await ticketsChannel
            .send(await buildEmbed.apply(this, embed))
            .then(async (m: any) => {
              if (REGULAR_TICKET_EMOJIS[index])
                await m.react(REGULAR_TICKET_EMOJIS[index]);
            });
        });
        break;
      case "pticket":
        PRIORITY_TICKET_EMBEDS.forEach(async (embed: any, index: number) => {
          const pTicketsChannel = await guild.channels.cache.get(
            PRIORITY_TICKET_CHANNEL
          );
          await pTicketsChannel
            .send(await buildEmbed.apply(this, embed))
            .then(async (m: any) => {
              if (PRIORITY_TICKET_EMOJIS[index])
                await m.react(PRIORITY_TICKET_EMOJIS[index]);
            });
        });
        break;
      case "info":
        const informationMirrorChannel = await guild.channels.cache.get(
          INFORMATION_MIRROR_CHANNEL
        );
        const informationChannel = await guild.channels.cache.get(
          INFORMATION_CHANNEL
        );
        informationChannel
          .send(await buildEmbed.apply(this, INFORMATION_EMBED))
          .then(async (m: any) => {
            await m.react(INVITED_EMOJI.id);
            await m.react(TWITTER_EMOJI.id);
            await m.react(YOUTUBE_EMOJI.id);
            await m.react(OTHER_EMOJI.id);
          });
        informationMirrorChannel.send("Awaiting reactions...");
        break;
      case "tos":
        const tosChannel = msg.channel;
        TERMS_OF_SERVICE_EMBEDS.forEach(async (embed: any, index: number) => {
          await tosChannel
            .send(await buildEmbed.apply(this, embed))
            .then(async (m: any) => {
              // last message needs a reaction
              if (index === TERMS_OF_SERVICE_EMBEDS.length - 1)
                await m.react(CHECK_EMOJI.id);
            });
        });
        break;
    }
    return {
      status: true,
      message: null,
    };
  },
};
