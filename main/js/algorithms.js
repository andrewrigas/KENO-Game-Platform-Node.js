
function getKenoNumbers(gamblers) {
    let rNum = [];
    let sumRewards = 0;
    let threshold = 0.8 * deposit();
    do {
        //Get 20 Random nuumbers
        rNum = getRandomNumbers();
        //Find all rewards
        let rewards = gamblers.map(element => findReward(element, rNum));
        // Get the sum of all rewards
        sumRewards = rewards.reduce((a, b) => { return a + b; }, 0);
        //20% or less money back
    } while (sumRewards > threshold);
    return rNum;
}

function getReward(kenoNum, elem) {
    return findReward(elem, kenoNum);
}



function findReward(elem, rNum) {
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
    while (randomNumbers.length < 20) {
        //Get random int number from 1 to 80
        var nextRandom = (Math.floor(Math.random() * 80) + 1).toString();
        //Check if it is exist already
        if (randomNumbers.indexOf(nextRandom) === -1) {
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



// Keno Probabilities
function getKenoResults(historyOfResults) {
    //Read file and store it into string
    //let historyOfResults = readFile();
    //Gett array with seperate games [id,date,[numbers]]
    let arrayHistoryOfResults = textToArray(historyOfResults);
    return arrayHistoryOfResults;
}

function findPropability(user, history) {
    //Get how many games 
    let totalGames = history.length;
    //Get only the numbers of each game
    onlyNumbers = history.map(game => game.slice(3));

    //Get the games that have the selectedNumbers in parallel
    let relatedGamesPar = divideToSmallerTasks(onlyNumbers, user.selectedNumbers, []);

    //Sum of all related games
    let sumAllRelatedGames = relatedGamesPar.reduce((a, b) => a + b, 0);

    //Calculate posibilty
    let pos = (sumAllRelatedGames * 100) / totalGames;

    //Serialiaze Data
    kenoPossibility = {
        pos: pos,
        total: totalGames,
        selectedNum: user.selectedNumbers,
        relatedGames: sumAllRelatedGames
    }

    return kenoPossibility;
}


//Get a string and return an array of games
function textToArray(history) {
    //Replace all break lines with empty char
    let strLine = history.replace(/(?:\r\n|\r|\n)/g, '');
    //Split all lines each game and remove last element which is empty bracets
    let games = strLine.split(';').slice(0, -1);
    //Remove weird characters
    let clearGames = games.map(game => game.replace('b', ''));
    //Split into 2d array each game with numbers data and id
    let historyOfResults = clearGames.map(game => game.split(','));

    return historyOfResults;
}



function divideToSmallerTasks(gamesNumbers, selectedNum) {
    //Get how many games left
    let gamesLength = gamesNumbers.length;
    if (gamesNumbers === undefined || gamesLength == 0) {
        //return an empty array and finish the recursion
        return [];
    } else if (gamesNumbers.length > 100) {
        //Divide array to 100 games and do the calculations to a smaller tasks and the call again the same function
        return [getRelatedGames(gamesNumbers.slice(0, 100), selectedNum), ...divideToSmallerTasks(gamesNumbers.slice(100, gamesLength), selectedNum)];
    } else {
        //less than 100 do the rest and finish the calcularions
        return [getRelatedGames(gamesNumbers, selectedNum)];
    }
}

//Recursive Function
function getRelatedGames(gameNumbers, selectedNum) {

    //When array get empty then return the list
    if (gameNumbers === undefined || gameNumbers.length == 0) {
        return 0;
    } else {
        let head = gameNumbers[0];
        //Check common numbers with game and selectedNUmbers
        let relatedNums = selectedNum.filter(num => head.indexOf(num) > -1);
        //If have the same lengths then all selectedNumbers has appear to the game
        if (relatedNums.length == selectedNum.length) {
            //Store the game and call the same function with one less element og games
            return 1 + getRelatedGames(gameNumbers.slice(1), selectedNum);
        } else {
            //Not store the game and call the same function with one less element og games
            return 0 + getRelatedGames(gameNumbers.slice(1), selectedNum);
        }
    }
}
