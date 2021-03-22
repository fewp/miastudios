import { Emoji } from "discord.js";
import log from "../utils/betterLogger";
export default async (guild: any, emoji: string): Promise<null | Emoji> => {
  try {
    const uploadedEmoji = await guild.emojis
      .create(`./src/assets/emojis/${emoji}.png`, emoji)
      .then((e: Emoji) => {
        log(`[SUCCESS] ${emoji} uploaded`);
        return e;
      });
    return uploadedEmoji;
  } catch (error) {
    log(`[ERROR] ${error}`);
    return null;
  }
};
