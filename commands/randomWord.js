const axios = require( "axios" ).default;

module.exports = async ( msg, args ) => {
    try {
        var url = 'https://random-words-api.vercel.app/word';
        var response = await axios( url );
        var randomWord = response.data[ 0 ].word;
        var definition = response.data[ 0 ].definition;
        var pronunciation = response.data[ 0 ].pronunciation;
        var wordmessage = "The Word: " + randomWord + "\n" + "The definition: " + definition + "\n" + "The pronunciation: " + pronunciation;
        await msg.channel.send( wordmessage );
    }
    catch ( error ) {
        console.log( error );
    }
};