const Twit = require('twit')
const db = require('./db.js')
const secretPath = './secret.json';

$REQUIRESECRET;

const twitConfig = {
    consumer_key:         $PLACEHOLDER.CONSUMER_KEY,
    consumer_secret:      $PLACEHOLDER.CONSUMER_SECRET,
    access_token:         $PLACEHOLDER.ACCESS_TOKEN,
    access_token_secret:  $PLACEHOLDER.ACCESS_TOKEN_SECRET
  }
const T = new Twit(twitConfig);

async function buildTweet() {
    const selection = await db.getSelection();
    
    return {id: selection.id, 
        content: `${selection.line1} 
${selection.line2} 
${selection.line3} 
                   ${String.fromCodePoint('0x' + selection.code)} - ${selection.author}`
    };
}

async function postTweet() {
    const tweet = await buildTweet();

    T.post('statuses/update', { status: tweet.content }, 
        function(err, data, response) {
            if (err) throw err;
            db.tweetDone(tweet.id);
        });
}

async function logTweet() {
    const tweet = await buildTweet();
    console.log(tweet);
}
// logTweet();

postTweet();
