const fs = require("fs")
//export the object to use it on server
module.exports = {

    getKenoResults: () =>{
        //Read file and store it into string
        let historyOfResults = readFile();
        //Gett array with seperate games [id,date,[numbers]]
        let arrayHistoryOfResults = textToArray(historyOfResults);
        return arrayHistoryOfResults;
    },

    findPropability: (user,history) => {
        //Get how many games 
        let totalGames = history.length;
        //Get only the numbers of each game
        onlyNumbers = history.map(game => game.slice(3));

        //Get the games that have the selectedNumbers in parallel
        let relatedGamesPar = divideToSmallerTasks(onlyNumbers,user.selectedNumbers,[]);

        //Sum of all related games
        let sumAllRelatedGames = relatedGamesPar.reduce( (a,b) => a + b , 0);

        //Calculate posibilty
        let pos = (sumAllRelatedGames*100)/totalGames;

        //Serialiaze Data
        kenoPossibility = {
            pos: pos,
            total: totalGames,
            selectedNum: user.selectedNumbers,
            relatedGames: sumAllRelatedGames
        }
        
        return kenoPossibility;
    }
}

//Get a string and return an array of games
function textToArray(history){
    //Replace all break lines with empty char
    let strLine = history.replace(/(?:\r\n|\r|\n)/g, '');
    //Split all lines each game and remove last element which is empty bracets
    let games = strLine.split(';').slice(0,-1);
    //Remove weird characters
    let clearGames = games.map( game => game.replace('b',''));
    //Split into 2d array each game with numbers data and id
    let historyOfResults = clearGames.map( game => game.split(','));

    return historyOfResults;
}

//Function that read csv file and store it into String
function readFile() {
    var history = '';
    //Read file synchronously to make sure we read all the file an then continue process
    history = fs.readFileSync("KENO-History-Results.csv", "utf8" ,(error, data) => {
        if (error) throw error;
        history = data;
    });
    return history;
}

//Recursive Function
function divideToSmallerTasks(gamesNumbers,selectedNum){
    //Get how many games left
    let gamesLength = gamesNumbers.length;
    if(gamesNumbers === undefined || gamesLength == 0){
        //return an empty array and finish the recursion
        return [];
    }else if(gamesNumbers.length > 100) {
        //Divide array to 100 games and do the calculations to a smaller tasks and the call again the same function
        return [getRelatedGames(gamesNumbers.slice(0,100),selectedNum), ...divideToSmallerTasks(gamesNumbers.slice(100,gamesLength),selectedNum)];
    }else{
        //less than 100 do the rest and finish the calcularions
        return [getRelatedGames(gamesNumbers,selectedNum)];
    }
}

//Recursive Function
function getRelatedGames(gameNumbers,selectedNum){
    
    //When array get empty then return the list
    if(gameNumbers === undefined || gameNumbers.length == 0){
        return 0;
    }else {
        let head = gameNumbers[0];
        //Check common numbers with game and selectedNUmbers
        let relatedNums = selectedNum.filter(num => head.indexOf(num) > -1);
        //If have the same lengths then all selectedNumbers has appear to the game
        if(relatedNums.length == selectedNum.length)
        {
            //Store the game and call the same function with one less element og games
            return 1 + getRelatedGames(gameNumbers.slice(1),selectedNum);
        }else{
            //Not store the game and call the same function with one less element og games
             return 0 + getRelatedGames(gameNumbers.slice(1),selectedNum);
        }
    }
}