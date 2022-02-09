module.exports = async ( msg, args ) => {
    var [ age, sex, location ] = args;
    await msg.reply( `Hello ${msg.author.username}, I see you're a ${age} year old ${sex} from ${location}. Wanna date?` );
};