module.exports = async (msg, args) => {
    var text = args.join(" ");
    await msg.delete();
    await msg.channel.send(text);
}