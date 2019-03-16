//Game class id and list of numbers
class Game {
    
    constructor(){
        this.id = Game.giveID();
    }

    setNumbers(numbers){
        if(numbers.length == 20){
            this.numbers = numbers;
        }else{
            this.numbers = 0;
        }
        
    }

    static giveID(){
        //Check if is the first time we create a keno class
        if(typeof this.ID == "undefined"){
            //set to 0
            this.ID = 0;
            return ++this.ID
        }else{
            // ID + 1
            return ++this.ID;
        }
    }

    getNumbers(){
        return this.numbers;
    }

    getID(){
        return this.id;
    }
}
