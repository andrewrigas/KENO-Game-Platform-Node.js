//export the object to use it on server
module.exports = {
    getKenoNumbers: function (gamblers) {
        let rNum = [];
        let sumRewards = 0;
        let threshold = 0.8 * deposit();
        do {
            //Get 20 Random nuumbers
            rNum = getRandomNumbers();
            //Find all rewards
            let rewards = gamblers.map(element => findReward(element,rNum));
            // Get the sum of all rewards
            sumRewards = rewards.reduce((a, b) => { return a + b; }, 0);
            //20% or less money back
        } while (sumRewards > threshold);
        return rNum;
    },

    getReward: function (kenoNum,elem) {
        return findReward(elem,kenoNum);
    }

}

function findReward(elem,rNum){
    //Common Numbers
    let cNum = commonNumbers(elem.betNumbers, rNum);
    //Get gameType
    let gameType = parseInt(elem.betNumbers.length);
    //Get Common numbers length to see matching numbers
    let fNum = parseInt(cNum.length);
    //Get bet Money
    let betMoney = parseInt(elem.money);
    //Get Pay value
    let pay = payTable[gameType - 1][gameType - fNum];
    //Get reward
    let reward = pay * betMoney;
    return reward;
}

function deposit() {
    return 1000000;
}

function getRandomNumbers() {
    var randomNumbers = [];
    while(randomNumbers.length < 20){
        //Get random int number from 1 to 80
        var nextRandom = (Math.floor(Math.random() * 80) + 1).toString();
        //Check if it is exist already
        if(randomNumbers.indexOf(nextRandom) === -1){
            randomNumbers.push(nextRandom);
        } 
    }
    return randomNumbers;
}

function commonNumbers(betNum, rNum) {
    //Return only the common numbers
    return betNum.filter((elem) => {
        return rNum.indexOf(elem) > -1;
    });
}


//Pay Array
let payTable = [
    [2.5, 0],
    [5, 1, 0],
    [25, 2.5, 0, 0],
    [100, 4, 1, 0, 0],
    [450, 20, 2, 0, 0, 0],
    [1600, 50, 7, 1, 0, 0, 0],
    [5000, 100, 20, 3, 1, 0, 0, 0],
    [15000, 1000, 50, 10, 2, 0, 0, 0, 0],
    [40000, 4000, 200, 25, 5, 1, 0, 0, 0, 0],
    [100000, 10000, 500, 80, 20, 2, 0, 0, 0, 0, 0],
    [500000, 15000, 1500, 250, 50, 10, 1, 0, 0, 0, 0, 0],
    [1000000, 25000, 2.500, 1000, 150, 25, 5, 0, 0, 0, 0, 0, 0]];
