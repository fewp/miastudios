const sqlite = require('sqlite3').verbose();
const emojis = require("../assets/emojis.json"); 
const channels = require("../assets/channels.json"); 
const messages = require("../assets/messages.json"); 
const style = require("../assets/embeds.json"); 
const Discord = require(`discord.js`);

module.exports = {
    do: async function(userId, reactionId, guild) {
        let db = await new sqlite.Database('./src/db/main.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);

        /* await db.run(`INSERT INTO where_from(user_id,reaction) VALUES(?, ?)`,[userId, reactionId]); */

        await db.all("SELECT * FROM where_from WHERE user_id = ?", [userId], async function(err, rows) {
            if (err) {
                console.log(err.message);
            }

            // se for maior que 0, o usuário já reagiu antes
            // o dado será deletado e um novo dado com a reação nova será adicionado
            if(rows.length > 0) {
                db.run(`DELETE FROM where_from WHERE user_id = ?`, [userId]);
                db.run(`INSERT INTO where_from(user_id, reaction) VALUES(?, ?)`,[userId, reactionId]);
            } else {
                db.run(`INSERT INTO where_from(user_id, reaction) VALUES(?, ?)`,[userId, reactionId]);
            }

            setTimeout(() => {module.exports.getInfo("embed-only", guild);}, 1500);
        });
    },
    getInfo: async function (channel, guild) {
        let db = await new sqlite.Database('./src/db/main.db', sqlite.OPEN_READONLY);

        await db.all("SELECT reaction, COUNT(*) FROM where_from GROUP BY reaction ORDER BY COUNT(*) DESC", async function(err, rows) {
            // posições:
            // 0 = Invited
            // 1 = Twitter
            // 2 = Youtube
            // 3 = Raindrops
            // 4 = Other
            var result = [0,0,0,0,0];
            if (err) {
                console.error(err.message);
            }
            await rows.forEach(function (row) {
                switch (row.reaction) {
                    case emojis.invited.id:
                        result[0] = row["COUNT(*)"]
                        break;
                    case emojis.twitter.id:
                        result[1] = row["COUNT(*)"]
                        break;
                    case emojis.youtube.id:
                        result[2] = row["COUNT(*)"]
                        break;
                    case emojis.raindrops.id:
                        result[3] = row["COUNT(*)"]
                        break;
                    case emojis.other.id:
                        result[4] = row["COUNT(*)"]
                        break;
                    default:
                        console.log(`Sorry, we are out of ${expr}.`);
                }

            })
            const box = '`';
            const text = 
            `${emojis.invited.text} ${box} INVITED  ${box} | **${result[0]}** 
            ${emojis.twitter.text} ${box} TWITTER  ${box} | **${result[1]}** 
            ${emojis.youtube.text} ${box} YOUTUBE  ${box} | **${result[2]}** 
            ${emojis.raindrops.text} ${box} RAINDROPS${box} | **${result[3]}** 
            ${emojis.other.text} ${box} OTHER    ${box} | **${result[4]}**`;

            const whereFromResultsEmbed = await new Discord.MessageEmbed()
                .setColor(style.color1)
                .setTitle("**Where did you find us?**")
                .setDescription(`${text}`)
            
            if(channel !== "embed-only") {
                channel.send(whereFromResultsEmbed);
            } else {
                const mirrorChannel = await guild.channels.cache.get(channels.whereFromMirror);
                await mirrorChannel.messages.fetch({around: messages.whereFromMirror, limit: 1}).then(async (messages) => {
                    const oldMessage = await messages.first();
                    oldMessage.edit(whereFromResultsEmbed);
                })
            }
        });

        

    }
}

