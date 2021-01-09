// packages
const Discord = require(`discord.js`);
const client = new Discord.Client({partials: ['MESSAGE', 'CHANNEL', 'REACTION']});

// configs and ids
const config       = require("./assets/config.json");
const messages     = require(`./assets/messages.json`);
const channels     = require(`./assets/channels.json`);
const style        = require(`./assets/embeds.json`);
const emojis       = require(`./assets/emojis.json`);

// functions
const announce     = require("./functions/announce");
const showcase     = require("./functions/showcase");
const store        = require("./functions/store");
const verify       = require("./functions/verify");
const help         = require("./functions/help");

// tickets
const commission   = require("./functions/tickets/commission");
const application  = require("./functions/tickets/application");
const support      = require("./functions/tickets/support");
const pCommission  = require("./functions/tickets/priorityCommission");
const pSupport     = require("./functions/tickets/prioritySupport");

// ticket functions
const close        = require("./functions/tickets/functions/close");
const invite       = require("./functions/tickets/functions/invite");
const kick         = require("./functions/tickets/functions/kick");
const leave        = require("./functions/tickets/functions/leave");
const review       = require("./functions/tickets/functions/review");

// utils
const cleanArray   = require("./utils/cleanArray");
const embeds       = require('./utils/embeds');

client.login(config.token);

client.on(`message`, async msg => {

    if (msg.author.id === '213022739923992576' && msg.content === "-send info"){
        /* Where did you find us?

        I was invited\n
        I came from Twitter\n
        I came from YouTube\n
        I came from Raindrops Hosting\n
        I came from other social media */


        const whereFromEmbed = new Discord.MessageEmbed()
            .setColor(style.color1)
            .setTitle("**Where did you find us?**")
            .setDescription(`<:Invited:796640209256054796> I was invited\n<:Twitter:796642093996310548> I came from Twitter\n<:Youtube:796641872067952670> I came from YouTube\n<:RainDrops:796640577642168320> I came from Raindrops Hosting\n<:Other:796641879668162560> I came from other social media`)
        
        msg.channel.send(whereFromEmbed);

    }


    if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;
    let argsUnclear = msg.content.slice(config.prefix.length).split('"');
    argsUnclear.shift();
    var args = cleanArray.do(argsUnclear);
	const argsC = msg.content.slice(config.prefix.length).split(/ +/);
    const command = argsC.shift().toLowerCase();
    const channel = msg.channel;
    var box = '`';

    console.log(`Command used: ${command}`);
    if(args.length > 0){
        console.log(`Arguments: ${args}`);
    } else {
        console.log(`Arguments: ${argsC}`);
    }

    if(command === 'help') {
        
        help.do(msg.channel);
        msg.delete();
        return;
    }

    if (channel.id === `${channels.botCommands}`){
        if(command === "announce"){
            announce.do(args, msg);
            msg.delete();
            return;

        } else if(command === "store"){
            store.do(args, msg);
            msg.delete();
            return;

        } else if(command === "showcase"){
            showcase.do(args, msg);
            msg.delete();
            return;
        }
        
    }

    const membro = msg.guild.members.cache.get(msg.author.id);
    var name = membro.displayName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    console.log(name)



    if(channel.parentID === channels.parents.commission || channel.parentID === channels.parents.support || channel.parentID === channels.parents.application || channel.parentID === channels.parents.priorityCommission || channel.parentID === channels.parents.prioritySupport ){
        if(command === "ticket" ){
            if(argsC.length > 0){
                if(argsC.length === 1){
                    // comandos com 1 argumento
                    if(argsC[0] == 'close'){
                        close.do(channel, name, msg);
                        msg.delete();
                        return;
                    } else if(argsC[0] == 'leave'){
                        leave.do(channel, name, msg.author);
                        msg.delete();
                        return;
                    } 
                } else if (argsC.length === 2){
                    // comandos com 2 argumentos
                    var userId = argsC[1].replace(/[^0-9]/g, '').toLowerCase();
                    var user = msg.guild.members.cache.get(userId);
                    if(argsC[0] == 'kick'){
                        kick.do(user, channel);
                        msg.delete();
                        return;
                    } else if(argsC[0] == 'invite'){
                        invite.do(user, channel);
                        msg.delete();
                        return;
                    } 
                }
            }
        } else if (command === 'review'){
            if(argsC.length > 1 || argsC.length < 0){
                const incorrectUsage = new Discord.MessageEmbed()
                    .setColor(style.color1)
                    .setDescription(`${emojis.mia.text} **Error!**\nIncorrect command usage, the correct syntax is: ${box}-review <@User>${box}.`)
                    .setTimestamp()
                    .setFooter('\u200b', `${style.logo}`);

                channel.send(incorrectUsage);
            } else {
                var userId = argsC[0].replace(/[^0-9]/g, '').toLowerCase();
                var user = msg.guild.members.cache.get(userId);

                
                review.do(msg.author, user, channel, msg.guild);
                msg.delete();
                return;
            }
        }
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
    if (channel_id != channels.tos && channel_id != channels.ticket && channel_id != channels.priorityTicket) return; 

    try {
        reaction.users.remove(user);
    } catch (error) {
        console.error('Falha ao remover a reação.');
    }

    if(message_id === messages.tos){
        verify.do(user.id, guild);
        return;
    } else if(message_id === messages.information){
        verify.do(user.id, guild);
        return;
    }
    
    var name = membro.displayName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    if (!guild.channels.cache.find(c => c.name === `ticket-${name}`)){
        if ( message_id === messages.commission){
            commission.do(guild, membro, name);
            return;
        } else if ( message_id === messages.support){
            support.do(guild, membro, name);
            return;
        } else if ( message_id === messages.application){
            application.do(guild, membro, name);
            return;
        } else if ( message_id === messages.priorityCommission){
            pCommission.do(guild, membro, name);
            return;
        } else if ( message_id === messages.prioritySupport){
            pSupport.do(guild, membro, name);
            return;
        }
    } else {
        // se o usuário já tiver um canal de ticket
        var channelName = `ticket-${name}`;
        const creationFailed = new Discord.MessageEmbed()
            .setColor(style.color1)
            .setDescription(`${emojis.mia.text} **Ticket creation failed!**\nYou already have a ticket channel, use that instead.\n${guild.channels.cache.find(c => c.name === channelName)} `)
            .setTimestamp()
            .setFooter('\u200b', `${style.logo}`);

        membro.send(creationFailed);
    }
});





// welcome message e membercount
client.on("guildMemberAdd", async (member) => {
    if(member.guild.id !== config.guildId) return;
    client.channels.cache.get(channels.memberCount).setName(`👥 • Members: ${member.guild.memberCount}`)

    const guild = await client.guilds.cache.get(config.guildId);
    const channel = guild.channels.cache.get(channels.welcome);
    const newMember = new Discord.MessageEmbed()
        .setColor(style.color1)
        .setTitle("Welcome to Mia Studios!")
        .setDescription(`Welcome to our server, <@${member.id}>!\n\nIf you would like to order a commission, apply or need support, please read our ${guild.channels.cache.get(channels.tos)} and then follow the instructions in the ${guild.channels.cache.get(channels.ticket)} channel.`)
        .setThumbnail(`https://cdn.discordapp.com/avatars/${member.id}/${member.user.avatar}`)
        .setTimestamp()
        .setFooter('Mia Studios', `${style.logo}`);
    channel.send(newMember);
});


client.on("guildMemberRemove", (member) => {
    if(member.guild.id !== config.guildId) return;
    client.channels.cache.get(channels.memberCount).setName(`👥 • Members: ${member.guild.memberCount}`)
});


