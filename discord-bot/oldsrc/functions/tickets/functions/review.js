const Discord = require(`discord.js`);
const style = require("../../../assets/embeds.json");
const emojis = require("../../../assets/emojis.json");
const channels = require("../../../assets/channels.json");
const getRating = require("../../../utils/getRating");

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
            const collectorM1 = m1.createReactionCollector(filter, {
                max: 1,
                time: 600000
            });

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
                    const collectorM2 = m2.createReactionCollector(filter, {
                        max: 1,
                        time: 600000
                    });
                    collectorM2.on('collect', async (reactionM2) => {
                        buildersRating = getRating.do(reactionM2);
                        const buildersRatingEmbed = new Discord.MessageEmbed()
                            .setColor(style.color1)
                            .setDescription(`${emojis.mia.text} Builders's rating set:\n${buildersRating}`)

                        // confirmando a nota que o usuário deu aos builders
                        await channel.send(buildersRatingEmbed);

                        const thirdEmbed = new Discord.MessageEmbed()
                            .setColor(style.color1)
                            .setDescription(`${emojis.mia.text} **${usuario}'s review**\nWould you like to leave a message in your review?`)
                            .setTimestamp()
                            .setFooter('This embed will expire in 10 minutes.', `${style.logo}`);

                        await channel.send(thirdEmbed).then(async (m3) => {
                            const check = guild.emojis.cache.get(emojis.checkmark.id);
                            const cross = guild.emojis.cache.get(emojis.cross.id);
                            await m3.react(check);
                            await m3.react(cross);

                            const collectorM3 = m3.createReactionCollector(filter, {
                                max: 1,
                                time: 600000
                            });
                            collectorM3.on('collect', async (reactionM3) => {
                                const emojiId = reactionM3._emoji.id;

                                // embed real de review
                                const reviewEmbed = new Discord.MessageEmbed()
                                    .setColor(style.color1)
                                    .setTitle('New Review')
                                    .setDescription(`Review by ${usuario}`)
                                    .addField("Manager Rating", `${manager} - ${managerRating}`, true)
                                    .addField("Builders Rating", `${buildersRating}`)
                                    .setTimestamp()
                                    .setFooter('\u200b', `${style.logo}`);

                                // embed de confirmação para o manager
                                const awaitingConfirmation = new Discord.MessageEmbed()
                                    .setColor(style.color1)
                                    .setTitle("New Review - **AWAITING MANAGER'S CONFIRMATION**")
                                    .setDescription(`Review by ${usuario}`)
                                    .addField("Manager Rating", `${manager} - ${managerRating}`, true)
                                    .addField("Builders Rating", `${buildersRating}`)
                                    .setTimestamp()
                                    .setFooter('\u200b', `${style.logo}`);


                                switch (emojiId) {
                                    // caso o usuário queira deixar uma mensagem na review
                                    // igualando ao id da "checkmark"
                                    case emojis.checkmark.id:
                                        const messageFilter = m => (m.author.id === usuario.id);
                                        const messageCollector = m3.channel.createMessageCollector(messageFilter, {
                                            max: 1,
                                            time: 60000
                                        });

                                        // pedindo para o usuário deixar sua mensagem
                                        const pleaseLeaveMessageEmbed = new Discord.MessageEmbed()
                                            .setColor(style.color1)
                                            .setDescription(`${emojis.mia.text} Type in your message below:`)
                                        await channel.send(pleaseLeaveMessageEmbed);

                                        await messageCollector.on('collect', async (m) => {
                                            console.log(`Review message: "${m.content}"`);
                                            reviewEmbed.setDescription(`Review by ${usuario}\n**“ ${m.content} ”**`)
                                            awaitingConfirmation.setDescription(`Review by ${usuario}\n**“ ${m.content} ”**`)

                                            // pedindo para o usuário deixar sua mensagem
                                            const messageConfirmationEmbed = new Discord.MessageEmbed()
                                                .setColor(style.color1)
                                                .setDescription(`${emojis.mia.text} Review by ${usuario}\n**“ ${m.content} ”**`)
                                            await channel.send(messageConfirmationEmbed);

                                            await channel.send(awaitingConfirmation).then(async (m4) => {
                                                await m4.react(check);
                                                await m4.react(cross);
                                                const managerFilter = (reaction, user) => user.id == manager.id ;
                                                const managerConfirmationCollector = m4.createReactionCollector(managerFilter, { max: 1, time: 600000});
                                               
                                                managerConfirmationCollector.on('collect', async (confirmation) => {
                                                    const confirmationEmoji = confirmation._emoji.id;
                                                    switch (confirmationEmoji) {
                                                        case emojis.checkmark.id:
                                                            const reviewSuccess = new Discord.MessageEmbed()
                                                                .setColor(style.color1)
                                                                .setDescription(`Review by ${usuario} succesfully accepted.\nSending to review channel.\n<#${channels.reviews}>`)
                                                                .setTimestamp()
                                                                .setFooter('\u200b', `${style.logo}`);
                                                            await channel.send(reviewSuccess);
                                                            await guild.channels.cache.get(channels.reviews).send(reviewEmbed)
            
                                                            break;
                                                        case emojis.cross.id:
                                                            const reviewFail = new Discord.MessageEmbed()
                                                                .setColor(style.color1)
                                                                .setDescription(`Review by ${usuario} was not accepted.`)
                                                                .setTimestamp()
                                                                .setFooter('\u200b', `${style.logo}`);
                                                            await channel.send(reviewFail);
                                                            break;
                                                        default:
                                                            console.log(`Default message.`);
                                                    }
                                                });
                                            });
                                        });
                                        break;

                                    // caso o usuário não queira deixar uma mensagem na review
                                    // igualando ao id da "cross"
                                    case emojis.cross.id:
                                        console.log(`User didn't want to leave a review message.`);

                                        await channel.send(awaitingConfirmation).then(async (m4) => {
                                            await m4.react(check);
                                            await m4.react(cross);
                                            const managerFilter = (reaction, user) => user.id == manager.id ;
                                            const managerConfirmationCollector = m4.createReactionCollector(managerFilter, { max: 1, time: 600000});
                                           
                                            managerConfirmationCollector.on('collect', async (confirmation) => {
                                                const confirmationEmoji = confirmation._emoji.id;
                                                switch (confirmationEmoji) {
                                                    case emojis.checkmark.id:
                                                        const reviewSuccess = new Discord.MessageEmbed()
                                                            .setColor(style.color1)
                                                            .setDescription(`Review by ${usuario} succesfully accepted.\nSending to review channel.\n<#${channels.reviews}>`)
                                                            .setTimestamp()
                                                            .setFooter('\u200b', `${style.logo}`);
                                                        await channel.send(reviewSuccess);
                                                        await guild.channels.cache.get(channels.reviews).send(reviewEmbed)
        
                                                        break;
                                                    case emojis.cross.id:
                                                        const reviewFail = new Discord.MessageEmbed()
                                                            .setColor(style.color1)
                                                            .setDescription(`Review by ${usuario} was not accepted.`)
                                                            .setTimestamp()
                                                            .setFooter('\u200b', `${style.logo}`);
                                                        await channel.send(reviewFail);
                                                        break;
                                                    default:
                                                        console.log(`Default message.`);
                                                }
                                            });
                                        });
                                        break;
                                    default:
                                        console.log(`Default message.`);
                                }
                            });
                        });
                    });
                });
            });
        });

    }
}