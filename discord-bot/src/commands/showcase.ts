import { Message } from "discord.js";
import { FunctionResponse } from "src/types";

module.exports = {
  name: "Showcase",
  description: "Sends a showcase to the #showcases channel",
  run(msg: Message, args: string[]): FunctionResponse {
    msg.channel.send("lol");
    return {
      status: true,
      message: null,
    };
  },
};
