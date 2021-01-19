// packages
const Discord = require(`discord.js`);
const client = new Discord.Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
const YouTubeNotifier = require('youtube-notification');
const http = require("http");
const express = require("express");
const app = express();
var server = http.createServer(app);

// configs and ids
const config = require("./assets/config.json");
const messages = require(`./assets/messages.json`);
const channels = require(`./assets/channels.json`);
const style = require(`./assets/embeds.json`);
const emojis = require(`./assets/emojis-testing.json`);

// functions

const help = require("./functions/help");

const review = require("./functions/tickets/functions/review-update");

// utils
const cleanArray = require("./utils/cleanArray");
const embeds = require('./utils/embeds');

client.login(config.token);


client.on(`message`, async msg => {


    if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;
    let argsUnclear = msg.content.slice(config.prefix.length).split('"');
    argsUnclear.shift();
    var args = cleanArray.do(argsUnclear);
    const argsC = msg.content.slice(config.prefix.length).split(/ +/);
    const command = argsC.shift().toLowerCase();
    const channel = msg.channel;
    var box = '`';

    console.log(`Command used: ${command}`);
    if (args.length > 0) console.log(`Arguments: ${args}`); 
    else console.log(`Arguments: ${argsC}`);

    if (command === 'help') {
        help.do(msg.channel);
        msg.delete();
        return;
    }

    const membro = msg.guild.members.cache.get(msg.author.id);
    var name = membro.displayName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    console.log(name)



    if (channel.parentID === channels.parents.commission || channel.parentID === channels.parents.support || channel.parentID === channels.parents.application || channel.parentID === channels.parents.priorityCommission || channel.parentID === channels.parents.prioritySupport || channel.parentID === channels.parents.priorityCommission || channel.parentID === channels.parents.testing) {
           
        if (command === 'review' && msg.channel.id === "796639758351990815") {
            if (argsC.length > 1 || argsC.length < 0) {
                const incorrectUsage = new Discord.MessageEmbed()
                    .setColor(style.color1)
                    .setDescription(`${emojis.mia.text} **Error!**\nIncorrect command usage, the correct syntax is: ${box}-review <@User>${box}.`)
                    .setTimestamp()
                    .setFooter('\u200b', `${style.logo}`);

                channel.send(incorrectUsage);
            } else {
                var userId = argsC[0].replace(/[^0-9]/g, '').toLowerCase();
                var user = msg.guild.members.cache.get(userId);


                review.do(msg.author, user, channel, msg.guild);
                msg.delete();
                return;
            }
        }
    }
});
