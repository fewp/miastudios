import Discord, { MessageAttachment } from "discord.js";
import { FunctionResponse } from "../types";

module.exports = {
  name: "test",
  alias: "Testing",
  description: "Sends an announcement to the #announcements channel",
  permissionRequired: ["MANAGER"],
  argumentsSchema: null,
  isMultiWord: false, // if the arguments need to be separated by ""
  async run(msg: any): Promise<FunctionResponse> {
    msg.channel.send(
      new MessageAttachment(
        "https://cdn.discordapp.com/attachments/818620411423490092/819287784811790356/213022739923992576.png",
        `test.png`
      )
    );

    msg.delete();
    const embed = new Discord.MessageEmbed()
      .setColor("#fffffe")
      .setTitle("")
      .setDescription("description")
      .setFooter(`Mia Studios ${module}`, `https://i.imgur.com/c4rIyMf.png`)
      .setTimestamp()
      .setTitle(title)
      .setImage(image);

    return {
      status: true,
      message: null,
    };
  },
};
