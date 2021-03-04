const Discord    = require(`discord.js`);
const style      = require("../../../assets/embeds.json"); 
const emojis     = require("../../../assets/emojis.json"); 
const roles      = require("../../../assets/roles.json"); 
const checkPerm  = require("../../../utils/checkUserPermissions.js"); 

module.exports = {
    do: function (channel, name, msg) {
        const filter = m => m.content.length > 0;

        if(channel.name === `ticket-${name}` || checkPerm.do(msg.author, msg.guild)){
            var box = '`';
            const closure = new Discord.MessageEmbed()
                .setColor(style.color1)
                .setDescription(`${emojis.mia.text} **Closing The Ticket.**\nThis ticket channel will be closed in **20 seconds**, type **anything** to cancel its closure.`)
                .setTimestamp()
                .setFooter('\u200b', `${style.logo}`);
            channel.send(closure);

            channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time'] })
                .then(() => {
                    // cancelar a closure do canal
                    const closureCancelled = new Discord.MessageEmbed()
                        .setColor(style.color1)
                        .setDescription(`${emojis.mia.text} **Ticket closure cancelled.**\nThe channel closure was cancelled, type ${box}-ticket close${box} to close the ticket.`)
                        .setTimestamp()
                        .setFooter('\u200b', `${style.logo}`);
                    channel.send(closureCancelled).then((m) => {m.delete({ timeout: 10000 });});;
                    return;
                })

                .catch(() => {
                    channel.delete();
                    console.log(`Ticket ${channel.name} foi fechado com sucesso por ${name}.`)
                });
        } else {
            const error = new Discord.MessageEmbed()
                .setColor(style.color1)
                .setDescription(`${emojis.mia.text} **Ticket closure failed.**\nA ticket can only be closed by its owner or by a staff member.`)
                .setTimestamp()
                .setFooter('\u200b', `${style.logo}`);
            channel.send(error).then((m) => {m.delete({ timeout: 10000 });});;
        }
    }
}




