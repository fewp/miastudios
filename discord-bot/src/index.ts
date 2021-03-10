import { GuildMember, Message, User } from "discord.js";
import fs from "fs";
import { REACTION_MESSAGE_CHANNELS_ARRAY } from "./assets/Channels";
import createConnection from "./db/createConnection";
import counter from "./functions/counter";
import welcome from "./functions/welcome";
import log from "./utils/betterLogger";

require("dotenv-safe").config();

const DiscordJS = require("discord.js");
const discordClient = new DiscordJS.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

const conn = createConnection();

// custom collections
discordClient.commands = new DiscordJS.Collection(); // commands that can be used through chat.
discordClient.reactionFunctions = new DiscordJS.Collection(); // commands that run whenever a reaction is added

const commands = fs.readdirSync("./src/commands");
const reactionFunctions = fs.readdirSync("./src/functions/reactions");

for (const file of commands) {
  const command = require(`./commands/${file.split(".").shift()}.js`);

  // commands used in development, can be reactivated again
  if (file.charAt(0) != "_") {
    discordClient.commands.set(command.name.toLowerCase(), command);
    log(`[COMMAND LOADED] ${command.name}`);
  }
}

// get reaction function files and add them to the Discord client
for (const file of reactionFunctions) {
  const fn = require(`./functions/reactions/${file.split(".").shift()}.js`);
  discordClient.reactionFunctions.set(fn.message, fn);
  log(`[FUNCTION LOADED] ${fn.name}`);
}

discordClient.login(process.env.DISCORD_TOKEN);
discordClient.once("ready", () => {});

discordClient.on(`message`, async (msg: Message) => {
  if (!msg.content.startsWith(`${process.env.PREFIX}`) || msg.author.bot)
    return;
  let args = msg.content.slice(`${process.env.PREFIX}`.length).trim();
  const command = args.split(/ +/).shift().toLowerCase();
  args = args.slice(command.length + 1);

  // if the command doesn't exist
  if (!discordClient.commands.has(command)) return;
  log(`[COMMAND USED] ${command}`);
  log(`[ARGS] ${args}`);
  try {
    const commandResponse = await discordClient.commands
      .get(command)
      .run(msg, args);

    if (!commandResponse.status) log(`[ERROR] ${commandResponse.message[0]}`);
    else log(`[SUCCESS] Command ran succesfully`);
  } catch (error) {
    log(`[ERROR] ${error}`);
  }
});

discordClient.on(`messageReactionAdd`, async (reaction: any, user: User) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;

  const guild = await discordClient.guilds.cache.get(
    process.env.DISCORD_GUILD_ID
  );
  const member = await guild.members.cache.get(user.id);
  const channel_id = reaction.message.channel.id;
  const message_id = reaction.message.id;

  // If the reaction was not added in a reaction specific channel
  if (!REACTION_MESSAGE_CHANNELS_ARRAY.includes(channel_id)) return;

  // remove the reaction so the number stays at 1
  try {
    reaction.users.remove(user);
  } catch (error) {
    log("[ERROR] Couldn't remove a reaction");
  }

  if (!discordClient.reactionFunctions.has(message_id)) return;
  const fn = discordClient.reactionFunctions.get(message_id);
  log(`[FUNCTION USED] ${fn.name}`);
  try {
    const response = await fn.run(member, guild, reaction._emoji.id);
    if (response.status == false) log(`[ERROR] ${response.message[0]}`);
    else log(`[SUCCESS] Function ran succesfully`);
  } catch (error) {
    log(`[ERROR] ${error}`);
  }
});

discordClient.on("guildMemberAdd", async (member: GuildMember) => {
  const guild = await discordClient.guilds.cache.get(
    process.env.DISCORD_GUILD_ID
  );

  welcome(guild, member);
  counter(guild);
});

discordClient.on("guildMemberRemove", async (_member: GuildMember) => {
  const guild = await discordClient.guilds.cache.get(
    process.env.DISCORD_GUILD_ID
  );
  counter(guild);
});
