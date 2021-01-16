const Discord              = require(`discord.js`);
const style                = require("../../../assets/embeds.json"); 
const emojis               = require("../../../assets/emojis.json"); 
const channels             = require("../../../assets/channels.json"); 
const getRating            = require("../../../utils/getRating");

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
            .setDescription(`${emojis.mia.text} **New Review**\nReact accordingly to rate the **manager** (${manager}).\n\n1 being extremely unsatisfied and 5 being extremely satisfied.`)
            .setTimestamp()
            .setFooter('This embed will expire in 10 minutes.', `${style.logo}`);
            
        // strings em que as "estrelas" da avaliação irão aparecer -> https://prnt.sc/svp189
        var managerRating = "";
        var buildersRating = "";

        channel.send(firstEmbed).then(async (m1) => {
            await m1.react(emoji1);
            await m1.react(emoji2);
            await m1.react(emoji3);
            await m1.react(emoji4);
            await m1.react(emoji5); 

            // filtro para os embeds de manager/builders rating
            const filter = (reaction, user) => !user.bot && user.id == usuario.id;

            // coletor de reações para o manager rating
            const collectorM1 = m1.createReactionCollector(filter, { max: 1, time: 600000 });

            // quando uma reação for coletada, este código irá rodar
            collectorM1.on('collect', async (reactionM1) => {
                managerRating = getRating.do(reactionM1);
                const managerRatingEmbed = new Discord.MessageEmbed()
                    .setColor(style.color1)
                    .setDescription(`${emojis.mia.text} ${manager}'s rating set:\n${managerRating}`)

                // confirmando a nota que o usuário deu ao manager
                await channel.send(managerRatingEmbed);

                const secondEmbed = new Discord.MessageEmbed()
                    .setColor(style.color1)
                    .setDescription(`${emojis.mia.text} **${usuario}'s review**\nReact accordingly to rate the **builders**.\n\n1 being extremely unsatisfied and 5 being extremely satisfied.`)
                    .setTimestamp()
                    .setFooter('This embed will expire in 10 minutes.', `${style.logo}`);

                await channel.send(secondEmbed).then(async (m2) => {
                    await m2.react(emoji1);
                    await m2.react(emoji2);
                    await m2.react(emoji3);
                    await m2.react(emoji4);
                    await m2.react(emoji5);

                    // coletores idênticos ao do manager
                    const collectorM2 = m2.createReactionCollector(filter, { max: 1, time: 600000 });
                    collectorM2.on('collect', async (reactionM2) => {
                        buildersRating = getRating.do(reactionM2);
                        const buildersRatingEmbed = new Discord.MessageEmbed()
                            .setColor(style.color1)
                            .setDescription(`${emojis.mia.text} Builders's rating set:\n${buildersRating}`)
        
                        // confirmando a nota que o usuário deu aos builders
                        await channel.send(buildersRatingEmbed);
        
                        // embed de confirmação para o manager
                        const reviewEmbed = new Discord.MessageEmbed()
                            .setColor(style.color1)
                            .setTitle('New Review')
                            .setDescription(`Review by ${usuario}`)
                            .addField("Manager Rating", `${manager} - ${managerRating}`, true)
                            .addField("Builders Rating", `${buildersRating}`)
                            .setTimestamp()
                            .setFooter('\u200b', `${style.logo}`);

                        const awaitingConfirmation = new Discord.MessageEmbed()
                            .setColor(style.color1)
                            .setTitle("New Review - **AWAITING MANAGER'S CONFIRMATION**")
                            .setDescription(`Review by ${usuario}`)
                            .addField("Manager Rating", `${manager} - ${managerRating}`, true)
                            .addField("Builders Rating", `${buildersRating}`)
                            .setTimestamp()
                            .setFooter('\u200b', `${style.logo}`);

                        await channel.send(awaitingConfirmation).then(async (m3) => {
                            const check = guild.emojis.cache.get(emojis.checkmark.id);
                            const cross = guild.emojis.cache.get(emojis.cross.id);
                            await m3.react(check);
                            await m3.react(cross);

                            const managerFilterSuccess = (reaction, user) => user.id == manager.id && reaction.emoji.id == emojis.checkmark.id;
                            const managerFilterFail = (reaction, user) => user.id == manager.id && reaction.emoji.id == emojis.cross.id;
                            const collectorSuccess = m3.createReactionCollector(managerFilterSuccess, { max: 1, time: 600000 });
                            const collectorFail = m3.createReactionCollector(managerFilterFail, { max: 1, time: 600000 });

                            collectorSuccess.on('collect', async () => {
                                const reviewSuccess = new Discord.MessageEmbed()
                                    .setColor(style.color1)
                                    .setDescription(`Review by ${usuario} succesfully accepted.\nSending to review channel.\n<#${channels.reviews}>`)
                                    .setTimestamp()
                                    .setFooter('\u200b', `${style.logo}`);
                                await channel.send(reviewSuccess);
                                await guild.channels.cache.get(channels.reviews).send(reviewEmbed)

                            });
                            
                            // caso nenhuma reação seja coletada em 10 minutos
                            collectorSuccess.on('end', (collected, reason) => {
                                console.log(reason)
                                if(reason == "time" && reviewSuccess === null){
                                    channel.send(error);
                                }
                            });


                            collectorFail.on('collect', async () => {
                                const reviewFail = new Discord.MessageEmbed()
                                    .setColor(style.color1)
                                    .setDescription(`Review by ${usuario} was not accepted.`)
                                    .setTimestamp()
                                    .setFooter('\u200b', `${style.logo}`);
                                await channel.send(reviewFail);
                            });


                            // caso nenhuma reação seja coletada em 10 minutos
                            collectorFail.on('end', (collected, reason) => {
                                console.log(reason)
                                if(reason == "time" && reviewFail === null){
                                    channel.send(error);
                                }
                            });
                        });
                    });

                    // caso nenhuma reação seja coletada em 10 minutos
                    collectorM2.on('end', (collected, reason) => {
                        console.log(reason)
                        if(reason == "time" && buildersRating === null){
                            channel.send(error);
                        }
                    });
                });
            });
            // caso nenhuma reação seja coletada em 10 minutos
            collectorM1.on('end', (collected, reason) => {
                console.log(reason)
                if(reason == "time" && managerRating === null){
                    channel.send(error);
                }
            });
        });

    }
}