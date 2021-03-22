import Discord from "discord.js";
export default (
  title: string | null,
  description: string | null,
  image: string | null,
  module: string,
  footer: boolean
) => {
  let embed;
  embed = new Discord.MessageEmbed().setColor("#fffffe"); // can't use #ffffff becase Discord makes it dark gray for some reason

  embed.setTitle("");
  embed.setDescription("");

  if (footer) {
    embed.setFooter(`Mia Studios ${module}`, `https://i.imgur.com/c4rIyMf.png`);
    embed.setTimestamp();
  }
  if (title) embed.setTitle(title);
  if (image) embed.setImage(image);
  if (description) embed.setDescription(description);

  return embed;
};
