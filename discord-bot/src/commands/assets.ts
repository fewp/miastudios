import fs from "fs";
import getChannelsContent from "../functions/assets/channelsFile";
import getEmojisContent from "../functions/assets/emojisFile";
import getMessagesContent from "../functions/assets/messagesFile";
import getRolesContent from "../functions/assets/rolesFile";
import { FunctionResponse } from "../types";
import log from "../utils/betterLogger";

module.exports = {
  name: "Asset",
  description:
    "Gets channels, messages, emojis and roles ids, and saves them into a file",
  // a * in front of an argument means it has to be an URL
  argumentsSchema: ["Asset"],
  isMultiWord: false,
  async run(msg: any, args: string): Promise<FunctionResponse> {
    switch (args) {
      case "emojis":
        const emojisContent = await getEmojisContent(msg.guild);

        await fs.appendFile(
          "./src/assets/Emojis.ts",
          emojisContent,
          (error: any) => {
            if (error)
              return {
                status: false,
                message: [error],
              };
            log("[SUCCESS] Emojis file created");
            return true;
          }
        );
        break;
      case "channels":
        const channelContent = await getChannelsContent(msg.guild);

        await fs.appendFile(
          "./src/assets/Channels.ts",
          channelContent,
          (error: any) => {
            if (error)
              return {
                status: false,
                message: [error],
              };
            log("[SUCCESS] Channels file created");
            return true;
          }
        );
        break;
      case "send":
        const send = require("../commands/send");
        await send.run(msg.guild, "tos");
        await send.run(msg.guild, "ticket");
        await send.run(msg.guild, "pticket");
        await send.run(msg.guild, "info");
        break;
      case "roles":
        const rolesContent = await getRolesContent(msg.guild);

        await fs.appendFile(
          "./src/assets/Roles.ts",
          rolesContent,
          (error: any) => {
            if (error)
              return {
                status: false,
                message: [error],
              };
            log("[SUCCESS] Roles file created");
            return true;
          }
        );
        break;
      case "messages":
        const messagesContent = await getMessagesContent(msg.guild);

        await fs.appendFile(
          "./src/assets/Messages.ts",
          messagesContent,
          (error: any) => {
            if (error)
              return {
                status: false,
                message: [error],
              };
            // log("[SUCCESS] Messages file created");
            return true;
          }
        );
        break;
    }
    return {
      status: true,
      message: null,
    };
  },
};
