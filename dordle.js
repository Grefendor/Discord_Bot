const axios = require("axios").default;
module.exports = class Dordle{
    constructor(){
        this.word = "";
        this.started = false;
        this.len = this.word.length;
    }
    async start(){
        try{
            this.started = true;
            let url = 'https://random-words-api.vercel.app/word';
            let response = await axios(url);
            this.word = response.data[0].word;
            console.log(this.word);
            this.len = this.word.length;
        }catch(error){
            console.log(error);
        }
    }
    test(){
        return this.started;
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