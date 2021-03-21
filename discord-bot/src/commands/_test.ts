import { MessageAttachment } from "discord.js";
import { FunctionResponse } from "../types";
import buildWelcomeHTML from "../utils/buildWelcomeHTML";
const nodeHtmlToImage = require("node-html-to-image");
module.exports = {
  name: "test",
  alias: "Testing",
  description: "Sends an announcement to the #announcements channel",
  permissionRequired: ["MANAGER", "DEVELOPER"],
  argumentsSchema: null,
  isMultiWord: false, // if the arguments need to be separated by ""
  async run(msg: any): Promise<FunctionResponse> {
    try {
      // sends a private message to the member.
      const puppeteerArgsProd = {
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
      const puppeteerArgs = {
        args: ["--no-sandbox"],
        headless: true,
      };

      const HTML = buildWelcomeHTML(msg.author);
      const image: any = await nodeHtmlToImage({
        html: HTML,
        quality: 100,
        type: "png",
        puppeteerArgs: puppeteerArgs,
        encoding: "buffer",
      });

      msg.channel.send(new MessageAttachment(image, `${msg.author.id}.png`));
    } catch (error) {
      return {
        status: false,
        message: [error],
      };
    }
    return {
      status: true,
      message: null,
    };
  },
};
