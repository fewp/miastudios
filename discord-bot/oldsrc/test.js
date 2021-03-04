// packages
const Discord = require(`discord.js`);
const client = new Discord.Client({partials: ['MESSAGE', 'CHANNEL', 'REACTION']});

// configs and ids
const config       = require("./assets/config.json");
const messages     = require(`./assets/messages.json`);
const channels     = require(`./assets/channels.json`);


const whereFrom       = require("./functions/whereFrom");


client.login(config.token);

client.on(`message`, async msg => {

    if (msg.author.id === '213022739923992576' && msg.content === "-if"){
        whereFrom.getInfo(msg.channel);
    }


    if (msg.author.id === '213022739923992576' && msg.content === "-si"){
        const whereFromEmbed = new Discord.MessageEmbed()
            .setColor(style.color1)
            .setTitle("**Where did you find us?**")
            .setDescription(`${emojis["invited"].text} I was invited\n${emojis["twitter"].text} I came from Twitter\n${emojis["youtube"].text} I came from YouTube\n${emojis["raindrops"].text} I came from Raindrops Hosting\n${emojis["other"].text} I came from other social media`)
        
        console.log(emojis["other"].id)

        msg.channel.send(whereFromEmbed).then(async (messageSent) => {
            await messageSent.react(emojis["invited"].id);
            await messageSent.react(emojis["twitter"].id);
            await messageSent.react(emojis["youtube"].id);
            await messageSent.react(emojis["raindrops"].id);
            await messageSent.react(emojis["other"].id);
        });
    }

});

client.on(`messageReactionAdd`, async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    
    const guild = await client.guilds.cache.get(config.guildId);
    const membro = await guild.members.cache.get(user.id);
    const channel_id = reaction.message.channel.id;
    const message_id = reaction.message.id;




    // mensagem não for de nenhum dos canais especificados
    if (channel_id != channels.tos && channel_id != channels.ticket && channel_id != channels.priorityTicket && channel_id != channels.information && channel_id != channels.miaTesting) return; 

    try {
        reaction.users.remove(user);
    } catch (error) {
        console.error('Falha ao remover a reação.');
    }


    if(message_id === messages.whereFrom){
        whereFrom.do(user.id, reaction._emoji.id, guild);
        return;
    } 
});

