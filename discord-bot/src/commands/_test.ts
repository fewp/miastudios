import { MessageAttachment } from "discord.js";
import buildWelcomeHTML from "../utils/buildWelcomeHTML";

const nodeHtmlToImage = require("node-html-to-image");
module.exports = {
  name: "test",
  description: "Tests a function",
  // a * in front of an argument means it has to be an URL
  argumentsSchema: null,
  async run(msg: any) {
    const HTML = buildWelcomeHTML(msg.author);
    const images = await nodeHtmlToImage({
      html: HTML,
      quality: 100,
      type: "png",
      puppeteerArgs: {
        args: ["--no-sandbox"],
      },
      encoding: "buffer",
    });
    msg.channel.send(new MessageAttachment(images, `${msg.author.id}.png`));
  },
};
