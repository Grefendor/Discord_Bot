const { Client, Intents } = require( "discord.js" );
const client = new Client( {
    intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ]
} );

const config = require( "../config.json" );
const Dordle = require( "./dordle.js" );
const axios = require( "axios" ).default;
//const fetch = require("node-fetch");

function dieDelete ( message ) {
    this.message = message;
    this.name = "dieDelete";
}

// Set the prefix
let prefix = config.prefix;
client.on( "messageCreate", async message => {
    if ( message.author.bot ) return;
    // This is where we'll put our code.
    if ( message.content.indexOf( config.prefix ) !== 0 ) return;


    const args = message.content.slice( config.prefix.length ).trim().split( / +/g );
    const command = args.shift().toLowerCase();

    switch ( command ) {
        case "ping":
            message.channel.send( "Pong!!" );
            break;
        case "blah":
            message.channel.send( "Meh." );
            break;
        case "asl":
            let [ age, sex, location ] = args;
            message.reply( `Hello ${message.author.username}, I see you're a ${age} year old ${sex} from ${location}. Wanna date?` );
            break;
        case "kick":
            let member = message.mentions.members.first();
            let reason = args.slice( 1 ).join( " " );
            member.kick( reason );
            break;
        case "say":
            let text = args.join( " " );
            message.delete();
            message.channel.send( text );
            break;
        case "gif":
            try {
                let search = args.join( " " );
                let url = `https://g.tenor.com/v1/search?q=${search}&key=${config.tenor}&limit=8`;
                let response = await axios( url );
                let index = ( Math.random() * response.data.results.length );
                index = Math.round( index );
                let gif = response.data.results[ index ].url;
                message.channel.send( gif );
            }
            catch ( error ) {
                console.log( error );
            }
            break;
        case "random":
            try {
                let url = 'https://random-words-api.vercel.app/word';
                let response = await axios( url );
                let randomWord = response.data[ 0 ].word;
                let definition = response.data[ 0 ].definition;
                let pronunciation = response.data[ 0 ].pronunciation;
                let wordmessage = randomWord + "\n" + definition + "\n" + pronunciation;
                message.channel.send( wordmessage );
            }
            catch ( error ) {
                console.log( error );
            }
            break;
        case "dordle":
            let argument = args.join( " " );
            if ( argument == "new" ) {
                let out = "";
                try {
                    if ( newDordle.test() ) {
                        message.channel.send( "We are already playing" );
                    }
                    else {
                        throw new dieDelete( "I have to get rid of this object somehow!" );
                    }
                }
                catch {
                    newDordle = new Dordle();
                    await newDordle.start();
                    let out = "";
                    for ( let i = 0; i < newDordle.len; i++ ) {
                        out = out + ":white_large_square: ";
                    }
                    message.channel.send( out + " " + newDordle.len + " Letters long" );
                }
            }
            else if ( argument == "repeat" ) {
                try {
                    if ( newDordle.test() ) {
                        let out = "";
                        for ( let i = 0; i < newDordle.len; i++ ) {
                            out = out + ":white_large_square: ";
                        }
                        message.channel.send( out + " " + newDordle.len + " Letters long" );
                    }
                    else {
                        message.channel.send( "You haven't started a game yet! Try !dordle new" );
                    }
                }
                catch {
                    message.channel.send( "You haven't started a game yet! Try !dordle new" );
                }
            }
            else if ( argument == "help" ) {
                let out = "The commands are as followed: !dordle new; !dordle repeat;!dordle help; !dordle <yourguesshere>";
                message.channel.send( out );
                try {
                    if ( newDordle.test() ) {
                        out = "One game is running. Try !dordle repeat";
                        message.channel.send( out );
                    }
                    else {
                        message.channel.send( "You haven't started a game yet! Try !dordle new" );
                    }
                }
                catch {
                    out = "No Game is running. Try !dordle new";
                    message.channel.send( out );
                }
            }
            else if ( argument == "hint" ) {
                let out = "";
                try {
                    if ( newDordle.test() ) {
                        out = "Okay, here comes the hint";
                        let hint = newDordle.hinting();
                        message.channel.send( out );
                        message.channel.send( hint );
                    }
                    else {
                        message.channel.send( "You haven't started a game yet! Try !dordle new" );
                    }
                }
                catch {
                    out = "No Game is running. Try !dordle new";
                    message.channel.send( out );
                }
            }
            else if ( argument == "end" ) {
                try {
                    if ( newDordle.test() ) {
                        message.channel.send( "Okay the game has ended. The word was:" );
                        message.channel.send( newDordle.word );
                        newDordle.started = false;
                        newDordle.word = "";
                        newDordle.len = 0;
                    }
                    else {
                        message.channel.send( "You haven't started a game yet! Try !dordle new" );
                    }
                }
                catch {
                    out = "No Game is running. Try !dordle new";
                    message.channel.send( out );
                }
            }
            else {
                try {
                    if ( newDordle.test() ) {
                        let out = newDordle.check( argument );
                        if ( out != "This word is not the same size! Try !dordle repeat or !dordle help" ) {
                            let output = "";
                            let win = false;
                            for ( let i = 0; i < newDordle.len; i++ ) {
                                if ( out[ i ] != ":green_square: " ) {
                                    win = false;
                                    break;
                                }
                                else {
                                    win = true;
                                }
                            }
                            for ( let j = 0; j < newDordle.len; j++ ) {
                                output = output + out[ j ];
                            }
                            if ( win ) {
                                message.channel.send( output );
                                message.channel.send( "You won!!!!!!" );
                                newDordle.started = false;
                                newDordle.word = "";
                                newDordle.len = 0;
                            }
                            else {
                                message.channel.send( output );
                            }
                        }
                        else {
                            message.channel.send( out );
                        }
                    }
                }
                catch {
                    message.channel.send( "You haven't started a game yet! Try !dordle new" );
                }
            }
            break;
    }
} );

client.login( config.token );