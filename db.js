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
    SELECT * 
    FROM public.haikus
    WHERE tweeted is false
    LIMIT 1;`);
    await client.end();
    
    return res.rows[0];
}

const tweetDone = async function(id) {
    await client.connect();  
    await client.query(`
      UPDATE haikus
      SET tweeted = true
      WHERE id = ${id};`);
        await client.end();
}

module.exports = {
    getSelection, tweetDone
}