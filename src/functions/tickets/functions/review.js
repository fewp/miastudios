const Discord              = require(`discord.js`);
const style                = require("../../../assets/embeds.json"); 
const emojis               = require("../../../assets/emojis.json"); 
const channels             = require("../../../assets/channels.json"); 
const checkUserPermissions = require("../../../utils/checkUserPermissions");

const error = new Discord.MessageEmbed()
    .setColor(style.color1)
    .setDescription(`${emojis.mia.text} **Error**\nNo reactions were collected in 10 minutes, review failed.`)
    .setTimestamp()
    .setFooter('\u200b', `${style.logo}`);


module.exports = {
    do: function (manager, usuario, channel, guild) {
        const emoji1 = guild.emojis.cache.get(emojis[1].id);
        const emoji2 = guild.emojis.cache.get(emojis[2].id);
        const emoji3 = guild.emojis.cache.get(emojis[3].id);
        const emoji4 = guild.emojis.cache.get(emojis[4].id);
        const emoji5 = guild.emojis.cache.get(emojis[5].id);

        const firstEmbed = new Discord.MessageEmbed()
            .setColor(style.color1)
            .setDescription(`${emojis.mia.text} **New Review**\nReact accordingly to rate the **manager**.\n\n1 being extremely unsatisfied and 5 being extremely satisfied.`)
            .setTimestamp()
            .setFooter('\u200b', `${style.logo}`);
/* await m1.react(emoji1);
            await m1.react(emoji2);
            await m1.react(emoji3);
            await m1.react(emoji4);
            await m1.react(emoji5); */
        
            
        channel.send(firstEmbed).then(async (m1) => {
            await m1.react('👌');

            const filter = (reaction) => {
                return reaction.emoji.name === '👌';
            };

            const collector = m1.createReactionCollector(filter, { time: 15000 });

            collector.on('collect', reaction => {
                console.log(`Collected ${reaction.emoji.name} from ${reaction.users.last().tag}`);
            });

            collector.on('end', () => {
                channel.send(error);
            });

            
        })

    }
}







