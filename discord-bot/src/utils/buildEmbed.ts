import Discord from "discord.js";
export default (
  title: string | null,
  description: string | null,
  module: string
) => {
  const embed = new Discord.MessageEmbed()
    .setColor("#ffffff")
    .setTimestamp()
    .setFooter(`Mia Studios ${module}`, `https://i.imgur.com/Nw84FVM.png`);

  embed.setTitle("");
  embed.setDescription("");

  if (title) embed.setTitle(title);
  if (description) embed.setDescription(description);

  return embed;
};
