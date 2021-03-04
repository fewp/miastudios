const getChannel = require(`../utils/getChannel`);
const style      = require("../assets/embeds.json"); 
const emojis     = require("../assets/emojis.json"); 
const channels   = require("../assets/channels.json"); 
const Discord    = require(`discord.js`);

module.exports = {
    do: function(args, msg) {
        const storeChannel = getChannel.do(msg.guild, channels.store);
        const box = '`';
        const storeEmbed = new Discord.MessageEmbed()
            .setColor(style.color1)
            .setTimestamp()
            .setFooter('Mia Studios Store System', `${style.logo}`);

        const success = new Discord.MessageEmbed()
            .setColor(style.color1)
            .setDescription(`${emojis.mia.text} **Success!**\nYour message was sent succesfully to the ${storeChannel} channel.`)
            .setTimestamp()
            .setFooter('\u200b', `${style.logo}`);

        const error = new Discord.MessageEmbed()
            .setColor(style.color1)
            .setDescription(`${emojis.mia.text} **Error!**\nThe correct usage for this command is ${box}-store "Title" "Price" "Dimensions" "Render" "Imgur Link"${box}`)
            .setTimestamp()
            .setFooter('\u200b', `${style.logo}`);

        if(args.length === 5){
            storeEmbed.setDescription(`**${args[0]}**\nPrice: ${args[1]}\nDimensions: ${args[2]}\nRender: ${args[3]}`);
            storeEmbed.setImage(`${args[4]}`);
            storeChannel.send(storeEmbed);
            msg.channel.send(success);
        } else {
            msg.channel.send(error);
        }
    }
}

