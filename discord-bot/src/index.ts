import { Message } from "discord.js";
import fs from "fs";
import log from "./utils/betterLogger";

require("dotenv-safe").config();

const DiscordJS = require("discord.js");
const discordClient = new DiscordJS.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
discordClient.commands = new DiscordJS.Collection();

const commands = fs.readdirSync("./src/commands");

for (const file of commands) {
  const command = require(`./commands/${file.split(".").shift()}.js`);
  discordClient.commands.set(command.name.toLowerCase(), command);
  log(`[COMMAND LOADED] ${command.name}`);
}

discordClient.login(process.env.DISCORD_TOKEN);
discordClient.once("ready", () => {});

discordClient.on(`message`, async (msg: Message) => {
  if (!msg.content.startsWith(`${process.env.PREFIX}`) || msg.author.bot)
    return;
  const args = msg.content
    .slice(`${process.env.PREFIX}`.length)
    .trim()
    .split(/ +/);
  const command = args.shift().toLowerCase();

  if (!discordClient.commands.has(command)) return;
  log(`[COMMAND USED] ${command}`);
  try {
    discordClient.commands.get(command).run(msg, args);
  } catch (error) {
    log(`[ERROR] ${error}`);
  }
});
