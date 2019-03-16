const express = require('express');
const socket = require('socket.io');
const kenoAlgorithms = require('./kenoAlgorithms.js');
const kenoProbabilities = require('./kenoProbabilities.js');
const fs = require('fs');
const port = 8000;

//Timers 
const seconds = 1000;
const kenoTime = 31000;
const waitTime = 11000;

var countdownWaitTime = null;
var countdown = null;
var kenotime = null
var waittime = null;

//Load history of results
historyOfResults = kenoProbabilities.getKenoResults();

//Setup express functions
const app = express();

//Listen on port
const server = app.listen(port, () => {
    console.log('Server is listening on port : ' + port);
});


//Static file Home Page
app.use(express.static('main'));

//Initialize sockets listen to server
let io = socket(server);

//Collect all Gamblers
let Gamblers = [];
//Collect kenoNumbers
let kenoNumbers = [];
io.on('connection', (socket) => {
    console.log('New connection');

    //add Gamblers to list 
    socket.on('addGambler', (data) => {
        Gamblers.push(data);
    });

    socket.on('requestHistory', (data) => {
        let results = kenoProbabilities.findPropability(data,historyOfResults);
        io.to(data.socketID).emit('responseHistory',results);
    });
    
});

//Start Bet timer when server start
setBetTimer();

//BetTimer Next Draw timer
function setBetTimer() {
    //Stop Timers
    clearInterval(countdownWaitTime);
    clearInterval(waittime);

    let countDownTime = kenoTime;
    //Set Interval
    countdown = setInterval(() => {
        //Actuall time
        countDownTime = countDownTime - seconds;
        //conver ms to mm:ss
        let time = msToTime(countDownTime);
        //Send time every second to all sockets
        io.sockets.emit('betTime',time);
    }, seconds);
    kenotime = setInterval(() => {
        //Event to disable bets
        io.sockets.emit('betEndTime', null);
        //Start Calculating and find Keno Numbers
        kenoNumbers = kenoAlgorithms.getKenoNumbers(Gamblers);
        waitTimer();
    }, kenoTime)
}

//Wait for the next draw and apper the Keno Numbers
function waitTimer() {
    //Stop Timers
    clearInterval(countdown);
    clearInterval(kenotime);

    let countDownWaitTime = waitTime;

    countdownWaitTime = setInterval(() => {
        //Actuall time
        countDownWaitTime = countDownWaitTime - seconds;
        //convert ms to mm:ss
        let time = msToTime(countDownWaitTime);
        //Send time every second to all sockets
        io.sockets.emit('waitTime',time);
    }, seconds);
    waittime = setInterval(() => {
        
        //Event to set Keno Numbers and Enable bets
        io.sockets.emit('waitEndTime', kenoNumbers);
        
        //Send to each socket id their reward
        Gamblers.forEach( elem => {
            io.to(elem.socketID).emit('reward',kenoAlgorithms.getReward(kenoNumbers,elem));
        });
        //Empty gamblers
        Gamblers = [];
        //Start Next draw timer
        setBetTimer();
    }, waitTime)
}

//Conver Miliseconds to Time mm:ss
function msToTime(duration) {
    var seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60);
    //If is less than 10 add '0'
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
}