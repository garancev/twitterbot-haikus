const Twit = require('twit')
const secretPath = './secret.json';
$REQUIRESECRET;
const haikus = require('./haikus.json').haikus;

const twitConfig = {
    consumer_key:         $PLACEHOLDER.CONSUMER_KEY,
    consumer_secret:      $PLACEHOLDER.CONSUMER_SECRET,
    access_token:         $PLACEHOLDER.ACCESS_TOKEN,
    access_token_secret:  $PLACEHOLDER.ACCESS_TOKEN_SECRET
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
