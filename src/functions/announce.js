const getChannel = require(`../utils/getChannel`);
const style      = require("../assets/embeds.json"); 
const emojis     = require("../assets/emojis.json"); 
const channels   = require("../assets/channels.json"); 
const Discord    = require(`discord.js`);

module.exports = {
    do: function(args, msg) {
        const announcementsChannel = getChannel.do(msg.guild, channels.announcements);
        const box = '`';
        const announceEmbed = new Discord.MessageEmbed()
            .setColor(style.color1)
            .setTimestamp()
            .setFooter('\u200b', `${style.logo}`);

        const success = new Discord.MessageEmbed()
            .setColor(style.color1)
            .setDescription(`${emojis.mia.text} **Success!**\nYour message was sent succesfully to the ${announcementsChannel} channel.`)
            .setTimestamp()
            .setFooter('\u200b', `${style.logo}`);

        const error = new Discord.MessageEmbed()
            .setColor(style.color1)
            .setDescription(`${emojis.mia.text} **Error!**\nThe correct usage for this command is ${box}-announce "Title" "Message"${box}`)
            .setTimestamp()
            .setFooter('\u200b', `${style.logo}`);

        if(args.length === 2){
            announceEmbed.setDescription(`${emojis.mia.text} **${args[0]}**\n${args[1]}`);
            announcementsChannel.send(announceEmbed);
            msg.channel.send(success);
        } else if (args.length === 1) {
            announceEmbed.setDescription(args[0]);
            announcementsChannel.send(announceEmbed);
            msg.channel.send(success);
        } else {
            msg.channel.send(error);
        }
    }
}

