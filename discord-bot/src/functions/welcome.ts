import { GuildMember, MessageAttachment } from "discord.js";
import nodeHtmlToImage from "node-html-to-image";
import log from "../utils/betterLogger";
import { WELCOME_CHANNEL } from "../assets/Channels";
import { FunctionResponse } from "../types";
import buildWelcomeHTML from "../utils/buildWelcomeHTML";

export default async (
  guild: any,
  member: GuildMember
): Promise<FunctionResponse> => {
  try {
    log(`[FUNCTION USED] Welcome`);
    const HTML = buildWelcomeHTML(member);
    const image: any = await nodeHtmlToImage({
      html: HTML,
      quality: 100,
      type: "png",
      puppeteerArgs: {
        args: ["--no-sandbox"],
      },
      encoding: "base64",
    });
    console.log(guild.channels);
    console.log(guild.channels.cache);
    const welcomeChannel = await guild.channels.cache.get(WELCOME_CHANNEL);
    welcomeChannel.send(new MessageAttachment(image, `${member.id}.png`));
  } catch (error) {
    log(`[ERROR] ${error}`);
    return {
      status: false,
      message: [error],
    };
  }
  return {
    status: true,
    message: null,
  };
};
