//Global Variables that all js files can access

//Create a connection
const socket = io.connect('http://localhost:8000/');

//Create a user
var person = factory.create('person');

//Directly regirester socket ID to a person
socket.on('connect', () => {
    person.setSocketID(socket.id);
});

var gambler = "Empty";
var user = "Empty";

//Variable to get the numbers from keno game event
let numToTable = [];

//Create a Keno game
var keno = factory.create("keno");

//Create an Array of selected numbers
let SelectedNumbers = [];

let alertCounts = 1;