// User Class
class Person {

    //Empty Constructor
    constructor(){
        this.id = Person.giveID();
    }

    static giveID(){
        //check if is the first time we create it
        if(typeof this.ID == "undefined"){
            this.ID = 0;//Set ID value first time
            return ++this.ID //return 1 + ID 
        }else{
            return ++this.ID;//return 1 + ID 
        }
    }

    //getters and setters
    getID(){
        return this.id;
    }

    getSocketID(){
        return this.socketID;
    }

    getName(){
        return this.name;
    }

    getAge(){
        return this.age;
    }

    setSocketID(socketID){
        this.socketID = socketID;
    }

    setName(name){
        this.name = name;
    }

    setAge(age){
        if(age >= 18){
            this.age = age;
        }
    }
  
}

class User {

    //Empty Constructor
    constructor(){
    }

    setPerson(person){
        this.person = person;
    }

    setSelectedNumbers(numbers){
        this.selectedNumbers = numbers;
    }

    getPerson(){
        return this.person;
    }

    getSelectedNumbers(){
        return this.selectedNumbers;
    }

    //Serialize Data to send over the server JSON
    getSerializeData(){
        return {id: this.person.getID() ,name: this.person.getName(),age: this.person.getAge(), socketID: this.person.getSocketID(),selectedNumbers: this.selectedNumbers};
    }

}


class Gambler {

    //Empty Constructor
    constructor(){
    }

    setPerson(person){
        this.person = person;
    }

    setBetNumbers(betNumbers){
        this.betNumbers = betNumbers;
    }

    setBetMoney(money){
        this.money = money;
    }

    getPerson(){
        return this.person;
    }

    getBetMoney(){
        return this.money;
    }

    getBetNumbers(){
        return this.betNumbers;
    }

    //Serialize Data to send over the server JSON
    getSerializeData(){
        return {id: this.person.getID() ,name: this.person.getName(),age: this.person.getAge(), socketID: this.person.getSocketID(),betNumbers: this.betNumbers, money: this.money};
    }
}
