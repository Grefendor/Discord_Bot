const eightBall = [ "As I see it, yes.", "Ask again later.", "Better not tell you now.", "Cannot predict now.",
    "Concentrate and ask again.", "Don't count on it.", "It is certain.", "It is decidedly so.", "Very doubtful.",
    "Signs point to yes.", "You may rely on it.", "Yes definitely.", "Without a doubt.", "Most likely.",
    "Outlook good.", "Yes", "Reply hazy, try again.", "Are you sure you want to know?", "Better not tell you now.",
    "Definitely not.", "Don't count on it.", "For sure.", "My reply is no.", "My sources say no.", "Outlook not so good.",
    "The outcome is positive.", "The outcome is negative.", "The outcome is unclear.", "No such luck.", "Luck is on your side."
];

module.exports = async ( msg, args ) => {
    if ( !args.length ) return;
    var index = Math.round( Math.random() * eightBall.length );
    await msg.reply( eightBall[ index ] );
};