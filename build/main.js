const Twit = require('twit')
const db = require('./db.js')
const emojis = require('./emojis.json').emojis
const secretPath = './secret.json';
;

const twitConfig = {
    consumer_key:         process.env.CONSUMER_KEY,
    consumer_secret:      process.env.CONSUMER_SECRET,
    access_token:         process.env.ACCESS_TOKEN,
    access_token_secret:  process.env.ACCESS_TOKEN_SECRET
  }
const T = new Twit(twitConfig);

async function buildTweet() {
    const selection = await db.getSelection();
    
    return `${selection.line1} 
${selection.line2} 
${selection.line3} 
                  ${emojis[selection.emoji]} - ${selection.author}`;
}

async function postTweet() {
    const tweet = await buildTweet();

    T.post('statuses/update', { status: tweet }, 
        function(err, data, response) {
            if (err) throw err;
            db.tweetDone(selection.id);
        });
}

async function logTweet() {
    const tweet = await buildTweet();
    console.log(tweet);
}
logTweet();

// postTweet();
