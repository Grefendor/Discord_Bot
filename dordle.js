module.exports = class Dordle{
    constructor(){
        this.word = "Happen";
        this.started = false;
        this.len = this.word.length;
    }
    start(){
        this.started = true;
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
            return "Good Job you can count";
        }
    }
};