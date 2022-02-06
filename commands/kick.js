module.exports = async (msg) => {
    var member = msg.mentions.members.first();
    var reason = args.slice(1).join(" ");
    await member.kick(reason);
}