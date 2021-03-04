const Discord    = require(`discord.js`);
const style      = require("../../../assets/embeds.json"); 
const emojis     = require("../../../assets/emojis.json"); 

module.exports = {
    do: function (channel, name, user) {

        if(channel.name === `ticket-${name}`){
            const error = new Discord.MessageEmbed()
                .setColor(style.color1)
                .setDescription(`${emojis.mia.text} **Error!**\nYou cannot leave your own ticket.`)
                .setTimestamp()
                .setFooter('\u200b', `${style.logo}`);
            channel.send(error).then((m) => {m.delete({ timeout: 10000 });});;
            return;
        } else {
            channel.updateOverwrite(user, {VIEW_CHANNEL: false, SEND_MESSAGES:false, READ_MESSAGE_HISTORY:false} );

            const success = new Discord.MessageEmbed()
                .setColor(style.color1)
                .setDescription(`<@${user.id}> left the ticket.`)
                .setTimestamp()
                .setFooter('\u200b', `${style.logo}`);
            channel.send(success).then((m) => {m.delete({ timeout: 10000 });});;
            return;
        }
    }
}





