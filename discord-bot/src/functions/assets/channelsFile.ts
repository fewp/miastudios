import {
  CHANNEL_NAMES,
  PARENT_CHANNEL_NAMES,
} from "../../assets/required/ChannelNames";

export default async (guild: any): Promise<string> => {
  let channels: string = "";

  await guild.channels.cache.forEach((channel: any) => {
    switch (channel.type) {
      case "text":
        if (
          CHANNEL_NAMES.includes(channel.name.split(process.env.SEPARATOR)[1])
        )
          channels +=
            "export const " +
            `${channel.name
              .split(process.env.SEPARATOR)[1]
              .replace(/-/g, "_")
              .toUpperCase()}_CHANNEL` +
            ": string = '" +
            channel.id +
            `'; // ${channel.name}\n`;
        break;
      case "voice":
        if (channel.name.includes(":"))
          if (
            CHANNEL_NAMES.includes(
              channel.name.slice(5).split(":")[0].toLowerCase()
            )
          )
            channels +=
              "export const " +
              `${channel.name
                .slice(5)
                .split(":")[0]
                .replace(/-/g, "_")
                .toUpperCase()}_CHANNEL` +
              ": string = '" +
              channel.id +
              `'; // ${channel.name}\n`;
        break;
      case "category":
        if (
          PARENT_CHANNEL_NAMES.includes(
            channel.name.split(process.env.SEPARATOR)[1].toUpperCase()
          )
        )
          channels +=
            "export const " +
            `${channel.name
              .split(process.env.SEPARATOR)[1]
              .replace(/ /g, "_")
              .toUpperCase()}_PARENT_CHANNEL` +
            ": string = '" +
            channel.id +
            `'; // ${channel.name}\n`;
        break;
    }
  });

  channels += `// Channels that will contain a reaction function
export const REACTION_MESSAGE_CHANNELS_ARRAY: string[] = [
    TERMS_OF_SERVICE_CHANNEL,
    CREATE_A_TICKET_CHANNEL,
    PRIORITY_TICKET_CHANNEL,
    INFORMATION_CHANNEL,
];`;

  return channels;
};
