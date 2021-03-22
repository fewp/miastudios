require("dotenv-safe").config();
const Twit = require("twit");

const T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms: process.env.EXPIRY_TIME,
  strictSSL: true,
});

export const TwitterStream = T.stream("statuses/filter", {
  follow: [process.env.TWITTER_USER_ID],
});
