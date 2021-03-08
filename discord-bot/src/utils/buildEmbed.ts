import Discord from "discord.js";
export default (
  title: string | null,
  description: string | null,
  image: string | null,
  module: string
) => {
  const embed = new Discord.MessageEmbed()
    .setColor("#fffffe") // can't use #ffffff becase Discord makes it dark gray for some reason
    .setTimestamp()
    .setFooter(`Mia Studios ${module}`, `https://i.imgur.com/Nw84FVM.png`);

  embed.setTitle("");
  embed.setDescription("");

  if (title) embed.setTitle(title);
  if (image) embed.setImage(image);
  if (description) embed.setDescription(description);

  return embed;
};
