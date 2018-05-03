const secretPath = './secret.json';
$REQUIRESECRET;

const { Client } = require('pg');

const client = new Client({
    connectionString: $PLACEHOLDER.DATABASE_URL,
    ssl: true,
});

const doDBQuery = async function() {
    await client.connect();
   
    const res = await client.query(`
        SELECT haikus.id, haikus.line1, haikus.line2, haikus.line3, haikus.line3, haikus.author, emojis.code
        FROM public.haikus as haikus
        JOIN emojis ON haikus.emoji = emojis.name
        WHERE haikus.tweeted is false
        ORDER BY RANDOM()
        LIMIT 1;
    `);
    const selection = res.rows[0];
    if (typeof selection === 'undefined') {
        await client.end();
        throw error;
    }
    return selection;
}

const getSelection = async function() {
    let selection = await doDBQuery();
    console.log(selection);

    return selection;
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