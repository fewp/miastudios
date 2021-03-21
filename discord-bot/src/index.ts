import { GuildMember, Message, User } from "discord.js";
import express from "express";
import fs from "fs";
import http from "http";
import {
  REACTION_MESSAGE_CHANNELS_ARRAY,
  SOCIAL_MEDIA_CHANNEL,
} from "./assets/Channels";
import { LOGO_EMOJI } from "./assets/Emojis";
import createConnection from "./db/createConnection";
import counter from "./functions/counter";
import { TwitterStream } from "./functions/twitter";
import welcome from "./functions/welcome";
import { FunctionResponse } from "./types";
import log from "./utils/betterLogger";
import buildEmbed from "./utils/buildEmbed";
import checkArguments from "./utils/checkArguments";
import checkPermissions from "./utils/checkPermissions";
import getCorrectUsage from "./utils/getCorrectUsage";
import getPermissionsRequired from "./utils/getPermissionsRequired";

const YouTubeNotifier = require("youtube-notification");

// express server
const app = express();
// server to get youtube notifications
var server = http.createServer(app);

require("dotenv-safe").config();

const DiscordJS = require("discord.js");
const discordClient = new DiscordJS.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

// database connection (will automatically update tables)
const conn = createConnection();

// custom collections
discordClient.commands = new DiscordJS.Collection(); // commands that can be used through chat.
discordClient.reactionFunctions = new DiscordJS.Collection(); // commands that run whenever a reaction is added

// reading command and function files
const commands = fs.readdirSync("./src/commands");
const reactionFunctions = fs.readdirSync("./src/functions/reactions");

// getting commands
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

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// WEBSITE CONTACT FORM
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.post("/contact", (req, res) => {
  console.log(`res`, res);
  console.log(`req`, req);
  // get data from body and send to #contact channel
});

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// TWITTER NOTIFICATIONS
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
discordClient.once("ready", () => {
  // will run whenever a new tweet event is fired
  TwitterStream.on("tweet", async (tweet: any) => {
    if (
      tweet.in_reply_to_status_id === null &&
      tweet.in_reply_to_user_id === null &&
      tweet.in_reply_to_screen_name === null &&
      tweet.user.screen_name.toLowerCase() == "mia_studios"
    ) {
      // parsing tweet URL
      const url: string =
        "https://twitter.com/" +
        tweet.user.screen_name +
        "/status/" +
        tweet.id_str;
      try {
        await discordClient.channels.cache
          .get(SOCIAL_MEDIA_CHANNEL)
          .send(`${url}`);
      } catch (error) {
        log(`[ERROR] ${error}`);
      }
    }
  });
});

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// YOUTUBE NOTIFICATIONS
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.get("/", (_req, res) => {
  log(`[PING] Ping Received.`);
  res.writeHead(200, {
    "Content-Type": "text/plain",
  });
  res.end("API");
});

const listener = server.listen(6969, function () {
  log(`[READY] Listening on port 6969`);
});

const notifier = new YouTubeNotifier({
  hubCallback: `${process.env.BASE_URL}:${process.env.YOUTUBE_PORT}/yt`,
});

notifier.on("notified", async (data: any) => {
  log(`New video`);
  await discordClient.guilds.cache
    .get(process.env.DISCORD_GUILD_ID)
    .channels.cache.get(SOCIAL_MEDIA_CHANNEL)
    .send(`${data.video.link}`);
});

// adding the miastudios channel to the listener
notifier.subscribe(process.env.YOUTUBE_CHANNEL_ID);

// adding the notifier to the express server;
app.use("/yt", notifier.listener());
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// COMMANDS THAT ARE CALLED THROUGH CHAT
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
discordClient.on(`message`, async (msg: Message) => {
  // ignoring the message if the user is a bot or it doesn't start with the server's prefix
  if (!msg.content.startsWith(`${process.env.PREFIX}`) || msg.author.bot)
    return;
  // getting the arguments (if there are any)
  let args = msg.content.slice(`${process.env.PREFIX}`.length).trim();
  // separating the command from the rest of the message
  const command = args.split(/ +/).shift().toLowerCase();
  // removing the command from the arguments (+1 for space)
  args = args.slice(command.length + 1);

  // if the command doesn't exist
  if (!discordClient.commands.has(command)) return;
  log(`[COMMAND USED] ${command}`);
  log(`[ARGS] ${args}`);

  try {
    // gets command
    const usedCommand = await discordClient.commands.get(command);

    // checking if the arguments are valid using the schema provided in the command module
    const argumentsResponse = checkArguments(
      args,
      usedCommand.argumentsSchema,
      usedCommand.isMultiWord
    );

    // means it has returned an error when running the argument verification
    if ((argumentsResponse as FunctionResponse).status === false) {
      // errors always return @ index 0 of the message array
      const errorMessage = (argumentsResponse as FunctionResponse).message[0];
      // building the error embed to send to the user
      const errorEmbed = buildEmbed(
        `${LOGO_EMOJI.text} Error!`,
        `${errorMessage}

      Correct usage:
      ${getCorrectUsage(usedCommand.argumentsSchema, usedCommand.name)}`,
        null,
        usedCommand.alias,
        true
      );

      // sends feedback to the administrator
      msg.channel.send(errorEmbed);
      return;
    }

    // checking user permissions
    const permissionsResponse = await checkPermissions(
      msg.author,
      msg,
      usedCommand.permissionRequired
    );

    // if the user doesnt have the required permissions
    if (permissionsResponse.status === false) {
      const missingPermissionsEmbed = buildEmbed(
        `${LOGO_EMOJI.text} Error!`,
        `${permissionsResponse.message[0]}
        
        ${getPermissionsRequired(usedCommand.permissionRequired)}`,
        null,
        usedCommand.alias,
        true
      );

      // sends feedback to the administrator
      await msg.channel.send(missingPermissionsEmbed);
      return;
    }

    // running the command and saving the response
    const commandResponse = await usedCommand.run(msg, argumentsResponse);

    // if status is false, it means the command has returned an error
    if (!commandResponse.status) log(`[ERROR] ${commandResponse.message[0]}`);
    // if no status in the commandResponse, it means the command has ran succesfully
    else log(`[SUCCESS] Command ran succesfully`);
  } catch (error) {
    log(`[ERROR] ${error}`);
  }
});

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// FUNCTIONS THAT ARE CALLED THROUGH REACTIONS
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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

  let isTicketFunction: boolean = false;

  // getting ticket function manually, since listens to multiple messages
  let fn = discordClient.reactionFunctions.get("ticket");

  // means the reaction was added in a ticket message, making this a ticket function
  if (fn.messages.includes(message_id)) isTicketFunction = true;

  // if it is not a ticket function and doesn't exist in the functions collection, return
  if (!isTicketFunction && !discordClient.reactionFunctions.has(message_id))
    return;

  // fetching the function and saving it in the fn variable if it is not a ticket function
  if (!isTicketFunction) fn = discordClient.reactionFunctions.get(message_id);
  log(`[FUNCTION USED] ${fn.name}`);

  try {
    // saving function response to a const for feedback and logging
    const response = await fn.run(member, guild, reaction);

    // resposnse status false means it has returned an error
    if (response.status === false) log(`[ERROR] ${response.message[0]}`);
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
