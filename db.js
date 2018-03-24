const secretPath = './secret.json';
$REQUIRESECRET;

const { Client } = require('pg');

const client = new Client({
    connectionString: $PLACEHOLDER.DATABASE_URL,
    ssl: true,
});

const getSelection = async function() {
    await client.connect();
    const res = await client.query(`
    SELECT haikus.id, haikus.line1, haikus.line2, haikus.line3, haikus.line3, haikus.author, emojis.code
    FROM public.haikus as haikus
    JOIN emojis ON haikus.emoji = emojis.name
    WHERE haikus.tweeted is false
    LIMIT 1;
`);
    if (typeof res.rows[0] === 'undefined') {
        await client.end();
        throw error;
    }
    return res.rows[0];
}
const tweetDone = async function(id) {
    await client.query(`
      UPDATE haikus
      SET tweeted = true
      WHERE id = ${id};`);
    await client.end();
}

module.exports = {
    getSelection, tweetDone
}