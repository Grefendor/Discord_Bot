const config = require("../config.json");
const axios = require( "axios" ).default;

module.exports = async (msg, args) => {
    try{
        var search = args.join(" ");
        var url = `https://g.tenor.com/v1/search?q=${search}&key=${config.tenor}&limit=8`;
        var response = await axios(url);
        var index = (Math.random() * response.data.results.length);
        index = Math.round(index);
        var gif = response.data.results[index].url;
        await msg.channel.send(gif);
    }catch(error){
        console.log(error);
    }
};