import { GuildMember, MessageAttachment } from "discord.js";
import {
  CREATE_A_TICKET_CHANNEL,
  TERMS_OF_SERVICE_CHANNEL,
  WELCOME_CHANNEL,
} from "../assets/Channels";
import { FunctionResponse } from "../types";
import log from "../utils/betterLogger";
import buildEmbed from "../utils/buildEmbed";
import buildWelcomeHTML from "../utils/buildWelcomeHTML";
const nodeHtmlToImage = require("node-html-to-image");

export default async (
  guild: any,
  member: GuildMember
): Promise<FunctionResponse> => {
  try {
    log(`[FUNCTION USED] Welcome`);
    const privateMessageEmbed = buildEmbed(
      "Welcome to **Mia Studios**!",
      `Greetings, <@${member.id}>!

      If you need would like to order a commission, need support or want to apply to our team, please read our <#${TERMS_OF_SERVICE_CHANNEL}> and then proceed to follow the instructions in the <#${CREATE_A_TICKET_CHANNEL}>.`,
      null,
      "Welcome",
      true
    );

    // sends a private message to the member.
    await member.send(privateMessageEmbed);
    const puppeteerArgs = {
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--headless",
        "--no-zygote",
        "--disable-gpu",
      ],
      headless: true,
      ignoreHTTPSErrors: true,
      ignoreDefaultArgs: ["--disable-extensions"],
      executablePath: "/usr/bin/chromium-browser",
    };

    const HTML = buildWelcomeHTML(member);
    const image: any = await nodeHtmlToImage({
      html: HTML,
      quality: 100,
      type: "png",
      puppeteerArgs: puppeteerArgs,
      encoding: "buffer",
    });
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
