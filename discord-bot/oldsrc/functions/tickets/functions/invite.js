const Discord              = require(`discord.js`);
const style                = require("../../../assets/embeds.json"); 
const emojis               = require("../../../assets/emojis.json"); 
const checkUserPermissions = require("../../../utils/checkUserPermissions");

module.exports = {
    do: function (user, channel) {

        if(channel.name === `ticket-${user.displayName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}` || checkUserPermissions.do(user)){
            const error = new Discord.MessageEmbed()
                .setColor(style.color1)
                .setDescription(`${emojis.mia.text} **Error!**\nThis member already has permission to read this channel.`)
                .setTimestamp()
                .setFooter('\u200b', `${style.logo}`);
            channel.send(error).then((m) => {m.delete({ timeout: 10000 });});;
            return;
        } else {
            channel.updateOverwrite(user, {VIEW_CHANNEL: true, SEND_MESSAGES:true, READ_MESSAGE_HISTORY:true} );

            const success = new Discord.MessageEmbed()
                .setColor(style.color1)
                .setDescription(`<@${user.id}> was invited.`)
                .setTimestamp()
                .setFooter('\u200b', `${style.logo}`);
            channel.send(success).then((m) => {m.delete({ timeout: 10000 });});;
            return;
        }
    }
}





