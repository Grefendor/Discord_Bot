const { Client, Intents } = require( "discord.js" );
const config = require( "./config.json" );

const commandHandler = require( './commands' );

const client = new Client( {
    intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ]
} );

client.once( 'ready', () => {
    console.log( 'Beep Boop, I am a bot' );
} );

client.on( 'messageCreate', commandHandler );

client.login( config.token );