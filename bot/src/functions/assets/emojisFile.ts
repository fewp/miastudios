import { EMOJI_NAMES } from "../../assets/required/EmojiNames";
import log from "../../utils/betterLogger";
import uploadEmoji from "../../utils/uploadEmoji";

export default async (guild: any): Promise<string> => {
  let emojisObjectArray: any = new Array();

  const uploadFinished = new Promise((resolve, _reject) => {
    EMOJI_NAMES.forEach(async (emoji: string, index: number) => {
      let e = await uploadEmoji(guild, emoji);
      if (!e) return; // failed upload
      const content = {
        name: e.name,
        text: `<:${e.name}:${e.id}>`,
        id: e.id.toString(),
      };
      await emojisObjectArray.push(content);
      if (index === EMOJI_NAMES.length - 1) resolve(true);
    });
  });

  await uploadFinished.then(() => {
    log("[SUCCESS] Finished uploading all emojis");
    return emojisObjectArray;
  });

  let emojisContent = "";
  emojisObjectArray.forEach((emoji: any) => {
    emojisContent += `export const ${emoji.name.toUpperCase()}_EMOJI = { text: "${
      emoji.text
    }", id: "${emoji.id}", }; // ${emoji.name}\n`;
  });

  return emojisContent;
};
