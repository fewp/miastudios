import { Message } from "discord.js";

module.exports = {
  name: "Showcase",
  description: "Sends a showcase to the #showcases channel",
  run(msg: Message, args: string[]) {
    msg.channel.send("lol");
    console.log("args", args);
    msg.channel.send("");
  },
};
