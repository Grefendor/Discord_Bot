console.log("Beep, Beep");

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.login('');

client.on('ready', readyDiscord);

function readyDiscord(){
    console.log('I love you');
}