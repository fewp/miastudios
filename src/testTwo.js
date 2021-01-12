const http = require("http");
const express = require("express");
const app = express();
var server = http.createServer(app);
const channels = require(`./assets/channels.json`);
const discord = require("discord.js")
const client = new discord.Client()
const { TOKEN, CHANNEL_ID } = require("./config.json");
const YouTubeNotifier = require('youtube-notification');
app.get("/", (request, response) => {
  console.log(`Ping Received.`);
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("DISCORD BOT YO");
});

const listener = server.listen(process.env.PORT, function() {
  console.log(`Your app is listening on port ` + listener.address().port);
});





const notifier = new YouTubeNotifier({
  hubCallback: 'http://144.91.98.154/yt',
});


notifier.on('notified', data => {
  console.log('New MiaStudios Video');
  client.channels.cache.get(channels.socialMedia).send(
    `**${data.channel.name}** just uploaded a new video - **${data.video.link}**`
  );
});
 
notifier.subscribe("hyrowkid");

app.use("/yt", notifier.listener());

client.login(TOKEN)