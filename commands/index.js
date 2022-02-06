const ping = require('./ping');
const gif = require('./gif');
const kick = require('./kick');
const say = require('./say');
const asl = require('./asl');
const dordle = require('./dordle');
const randomWord = require('./randomWord');
const config = require("../config.json");

const commands = {
    ping,
    gif,
    kick,
    say,
    asl,
    randomWord,
    dordle,
    };


module.exports = async (msg) => {
    const args = msg.content.split(' ');
    if (msg.author.bot) return;
    if (args.length == 0 || args[0].charAt(0) !== config.prefix) return;
    const command = args.shift().substr(1);
    if (Object.keys(commands).includes(command)) {
        commands[command](msg, args);
    }
};