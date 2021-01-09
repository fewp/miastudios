const getChannel = require(`../utils/getChannel`);
const style      = require("../assets/embeds.json"); 
const emojis     = require("../assets/emojis.json"); 
const channels   = require("../assets/channels.json"); 
const Discord    = require(`discord.js`);

module.exports = {
    do: function(args, msg) {
        const showcaseChannel = getChannel.do(msg.guild, channels.showcase);
        const box = '`';
        const showcaseEmbed = new Discord.MessageEmbed()
            .setColor(style.color1)
            .setTimestamp()
            .setFooter('Mia Studios Showcase', `${style.logo}`);

        const success = new Discord.MessageEmbed()
            .setColor(style.color1)
            .setDescription(`${emojis.mia.text} **Success!**\nYour message was sent succesfully to the ${showcaseChannel} channel.`)
            .setTimestamp()
            .setFooter('\u200b', `${style.logo}`);

        const error = new Discord.MessageEmbed()
            .setColor(style.color1)
            .setDescription(`${emojis.mia.text} **Error!**\nThe correct usage for this command is ${box}-showcase "Title" "Client" "Dimensions" "Render" "Imgur Link"${box}`)
            .setTimestamp()
            .setFooter('\u200b', `${style.logo}`);

        if(args.length === 5){
            showcaseEmbed.setDescription(`**${args[0]}**\nClient: ${args[1]}\nDimensions: ${args[2]}\nRender: ${args[3]}`);
            showcaseEmbed.setImage(`${args[4]}`);
            showcaseChannel.send(showcaseEmbed);
            msg.channel.send(success);
        } else {
            msg.channel.send(error);
        }
    }
}

