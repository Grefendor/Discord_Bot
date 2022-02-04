const { Client, Intents } = require("discord.js");
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

const config = require("./config.json");

// Set the prefix
let prefix = config.prefix;
client.on("messageCreate", message => {
    if (message.author.bot) return;
    // This is where we'll put our code.
    if (message.content.indexOf(config.prefix) !== 0) return;


    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    switch(command){
        case "ping":
            message.channel.send("Pong!");
            break;
        case "blah":
            message.channel.send("Meh.");
            break;
        case "asl":
            let [age, sex, location] = args;
            message.reply(`Hello ${message.author.username}, I see you're a ${age} year old ${sex} from ${location}. Wanna date?`);
            break;
        case "kick":
            let member = message.mentions.members.first();
            let reason = args.slice(1).join(" ");
            member.kick(reason);
            break;
        case "say":
            let text = args.join(" ");
            message.delete();
            message.channel.send(text);
            break;
    }
});

client.login(config.token);