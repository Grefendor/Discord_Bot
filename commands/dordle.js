const axios = require("axios").default;

module.exports = async (msg, args) => {
    let argument = args.join(" ");
    if (argument == "new"){
        let out = "";
        try{
            if(newDordle.test()){
                msg.channel.send("We are already playing");
            } else{
                throw new dieDelete("I have to get rid of this object somehow!");
            }
        }
        catch{
            newDordle = new Dordle();
            await newDordle.start();
            let out = "";
            for(let i = 0; i < newDordle.len; i++){
                out = out + ":white_large_square: ";
            }
            msg.channel.send(out + " " + newDordle.len + " Letters long");
        }
    }
    else if(argument == "repeat"){
        try{
            if(newDordle.test()){
                let out = "";
                for(let i = 0; i < newDordle.len; i++){
                    out = out + ":white_large_square: ";
                }
                msg.channel.send(out + " " + newDordle.len + " Letters long");
            } else{
                msg.channel.send("You haven't started a game yet! Try !dordle new");
            }
        }
        catch{
            msg.channel.send("You haven't started a game yet! Try !dordle new");
        }
    }else if(argument == "help"){
        let out = "The commands are as followed: !dordle new; !dordle repeat;!dordle help; !dordle end; !dordle hint; !dordle <yourguesshere>";
        msg.channel.send(out);
        try{
            if(newDordle.test()){
                out = "One game is running. Try !dordle repeat";
                msg.channel.send(out);
            } else{
                msg.channel.send("You haven't started a game yet! Try !dordle new");
            }
        }
        catch{
            out = "No Game is running. Try !dordle new";
            msg.channel.send(out);
        }
    }else if(argument == "hint"){
        let out = "";
        try{
            if(newDordle.test()){
                out = "Okay, here comes the hint";
                let hint = newDordle.hinting();
                msg.channel.send(out);
                msg.channel.send(hint);
            } else{
                msg.channel.send("You haven't started a game yet! Try !dordle new");
            }
        }
        catch{
            out = "No Game is running. Try !dordle new";
            msg.channel.send(out);
        }
    } else if(argument == "end"){
        try{
            if(newDordle.test()){
                msg.channel.send("Okay the game has ended. The word was:");
                msg.channel.send(newDordle.word);
                newDordle.started = false;
                newDordle.word = "";
                newDordle.len = 0;
            } else{
                msg.channel.send("You haven't started a game yet! Try !dordle new");
            }
        }
        catch{
            out = "No Game is running. Try !dordle new";
            msg.channel.send(out);
        }
    } else{
        try{
            if(newDordle.test()){
                let out = newDordle.check(argument);
                if (out != "This word is not the same size! Try !dordle repeat or !dordle help"){
                    let output = "";
                    let win = false;
                    for(let i = 0; i < newDordle.len; i++){
                        if(out[i] != ":green_square: "){
                            win = false;
                            break;
                        } else{
                            win = true;
                        }
                    }
                    for(let j = 0; j < newDordle.len; j++){
                        output = output + out[j];
                    }
                    if (win){
                        msg.channel.send(output);
                        msg.channel.send("You won!!!!!!");
                        newDordle.started = false;
                        newDordle.word = "";
                        newDordle.len = 0;
                    }
                    else{
                    msg.channel.send(output);
                    }
                } else{
                    msg.channel.send(out);
                }
            }
        } catch{
            msg.channel.send("You haven't started a game yet! Try !dordle new");
        }
    }
};

class Dordle{
        constructor(){
        this.word = "";
        this.started = false;
        this.hint = "";
        this.len = this.word.length;
    }
    async start(){
        try{
            this.started = true;
            var url = 'https://random-words-api.vercel.app/word';
            var response = await axios(url);
            this.word = response.data[0].word;
            this.hint = response.data[0].definition;
            console.log(this.word);
            this.len = this.word.length;
        }catch(error){
            console.log(error);
        }
    }
    test(){
        return this.started;
    }
    hinting(){
        return this.hint;
    }
    check(word){
        let lenWord = word.length;
        if (lenWord != this.len){
            return "This word is not the same size! Try !dordle repeat or !dordle help";
        }
        else{
            let output = new Array();
            for(let i = 0; i < lenWord; i++){
                if(this.word.includes(word[i])){
                    if(this.word[i] == word[i]){
                        output[i] = ":green_square: ";
                    } else{
                        output[i] = ":yellow_square: ";
                    }
                } else{
                    output[i] = ":white_large_square: ";
                }
            }
            return output;
        }
    }
};