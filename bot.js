const { Client, Intents } = require("discord.js");
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

const config = require("./config.json");
const Dordle = require("./dordle.js");
const axios = require("axios").default;
//const fetch = require("node-fetch");

// Set the prefix
let prefix = config.prefix;
client.on("messageCreate",  async message => {
    if (message.author.bot) return;
    // This is where we'll put our code.
    if (message.content.indexOf(config.prefix) !== 0) return;


    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    switch(command){
        case "ping":
            message.channel.send("Pong!!");
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
        case "gif":
            let search = args.join(" ");
            let url = `https://g.tenor.com/v1/search?q=${search}&key=${config.tenor}&limit=8`;
            let response = await axios(url);
            let index = (Math.random() * response.data.results.length);
            index = Math.round(index);
            let gif = response.data.results[index].url;
            message.channel.send(gif);
            break;
        case "dordle":
            let argument = args.join(" ");
            if (argument == "new"){
                try{
                    if(newDordle.test()){
                        message.channel.send("We are already playing");
                    }
                }
                catch{
                    newDordle = new Dordle();
                    newDordle.start()
                    let out = "";
                    for(let i = 0; i < newDordle.len; i++){
                        out = out + ":white_large_square: ";
                    }
                    message.channel.send(out);
                }
            }
            else if(argument == "repeat"){
                try{
                    if(newDordle.test()){
                        let out = "";
                        for(let i = 0; i < newDordle.len; i++){
                            out = out + ":white_large_square: ";
                        }
                        message.channel.send(out);
                    }
                }
                catch{
                    message.channel.send("You haven't started a game yet! Try !dordle new");
                }
            }else if(argument == "help"){
                let out = "The commands are as followed: !dordle new; !dordle repeat;!dordle help; !dordle <yourguesshere>";
                message.channel.send(out);
                try{
                    if(newDordle.test()){
                        out = "One game is running. Try !dordle repeat";
                        message.channel.send(out);
                    }
                }
                catch{
                    out = "No Game is running. Try !dordle new";
                    message.channel.send(out);
                }
            }else{
                try{
                    if(newDordle.test()){
                        let out = newDordle.check(argument);
                        message.channel.send(out);
                    }
                }
                catch{
                    message.channel.send("You haven't started a game yet! Try !dordle new");
                }
            }
            break;
    }
});

client.login(config.token);