const Twit = require('twit')
const secretPath = './secret.json';
;
const haikus = require('./haikus.json').haikus;

const twitConfig = {
    consumer_key:         process.env.CONSUMER_KEY,
    consumer_secret:      process.env.CONSUMER_SECRET,
    access_token:         process.env.ACCESS_TOKEN,
    access_token_secret:  process.env.ACCESS_TOKEN_SECRET
  }
const T = new Twit(twitConfig);

const haikusLength = haikus.length;
const emojis = {
    winter: '\u2744'
}
function buildTweet() {
    const index = Math.floor(Math.random() * haikusLength);

    return `${haikus[index].line1} 
${haikus[index].line2} 
${haikus[index].line3} 
                  ${emojis[haikus[index].emoji]} - ${haikus[index].author}`;
}

function postTweet() {
    const tweet = buildTweet();
    
    T.post('statuses/update', { status: tweet }, 
        function(err, data, response) {
            if (err) {
                console.error(err);
            }
        });
}

postTweet();
