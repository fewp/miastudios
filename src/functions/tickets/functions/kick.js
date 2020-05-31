const Discord              = require(`discord.js`);
const style                = require("../../../assets/embeds.json"); 
const emojis               = require("../../../assets/emojis.json"); 
const checkUserPermissions = require("../../../utils/checkUserPermissions");

module.exports = {
    do: function (user, channel) {

        if(channel.name === `ticket-${user.displayName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}`){
            const error = new Discord.MessageEmbed()
                .setColor(style.color1)
                .setDescription(`${emojis.mia.text} **Error!**\nYou cannot kick the ticket owner.`)
                .setTimestamp()
                .setFooter('\u200b', `${style.logo}`);
            channel.send(error).then((m) => {m.delete({ timeout: 10000 });});;
            return;
        } else if (checkUserPermissions.do(user)) {
            const error = new Discord.MessageEmbed()
                .setColor(style.color1)
                .setDescription(`${emojis.mia.text} **Error!**\nYou cannot kick a staff member.`)
                .setTimestamp()
                .setFooter('\u200b', `${style.logo}`);
            channel.send(error).then((m) => {m.delete({ timeout: 10000 });});;
            return;
        } else {
            channel.updateOverwrite(user, {VIEW_CHANNEL: false, SEND_MESSAGES:false, READ_MESSAGE_HISTORY:false} );

            const success = new Discord.MessageEmbed()
                .setColor(style.color1)
                .setDescription(`<@${user.id}> was kicked.`)
                .setTimestamp()
                .setFooter('\u200b', `${style.logo}`);
            channel.send(success).then((m) => {m.delete({ timeout: 10000 });});;
            return;
        }
    }
}





