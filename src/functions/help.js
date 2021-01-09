const Discord = require(`discord.js`);
const style      = require("../assets/embeds.json"); 
const emojis     = require("../assets/emojis.json"); 

const box = '`';
const helpText = 
`${emojis.application.text} **TICKET COMMANDS**:

${emojis.arrowRight.text} ${box}-ticket close                                          ${box} | **close** 
${emojis.arrowRight.text} ${box}-ticket invite <@User>                                 ${box} | **invite** +
${emojis.arrowRight.text} ${box}-ticket kick <@User>                                   ${box} | **kick** +
${emojis.arrowRight.text} ${box}-ticket leave                                          ${box} | **leave**
${emojis.arrowRight.text} ${box}-review <@User>                                        ${box} | **review** *


${emojis.support.text} **REGULAR COMMANDS**:

${emojis.arrowRight.text} ${box}-help                                                  ${box} | **help**
${emojis.arrowRight.text} ${box}-announce "Title"^ "Message"                           ${box} | **announce** *
${emojis.arrowRight.text} ${box}-showcase "Title" "Client" "Dimensions" "Render" "IMG" ${box} | **showcase** *
${emojis.arrowRight.text} ${box}-store "Title" "Price" "Dimensions" "Render" "IMG"     ${box} | **store** *

Commands with a * can only be used by managers.
Commands with a + can only be used by ticket owners and managers.
Arguments with a ^ are optional.`;

module.exports = {
    do: function(channel) {
        const ticketHelpEmbed = new Discord.MessageEmbed()
            .setColor(style.color1)
            .setDescription(`${helpText}`)
            .setTimestamp()
            .setFooter('Mia Studios Help', `${style.logo}`);
        channel.send(ticketHelpEmbed);
    }
}

