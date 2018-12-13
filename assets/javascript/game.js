
var wordBank = ["thor", 
                "hulk", 
                "ironman",
                "hawkeye",
                "groot",
                "mantis",
                "drax",
                "gamora",
                "vision",
                "antman",
                "wasp",
                "spiderman",
                "thanos"];


var currentWord = "";
var currArray = []
var dispArray = [];
var lettersGuessed = [];
var remainingGuesses = 15;
var wins =  0;
var running = false;

var displayDiv = document.getElementById("display");
var remainingDiv = document.getElementById("guesses");
var usedDiv = document.getElementById("used");
var winDiv = document.getElementById("win-counter");
var resultsDiv = document.getElementById("results")



function updateWins(){
    winDiv.innerHTML = ""

    var winTxt = document.createElement("span");
    winTxt.textContent = wins;
    winDiv.appendChild(winTxt);
}

function updateDisplay() {

    displayDiv.innerHTML = "";
    remainingDiv.innerHTML = "";
    usedDiv.innerHTML = "";

    for(var i = 0; i < dispArray.length; i++) {
        var holder = document.createElement("span");
        holder.textContent = dispArray[i] + " ";
        displayDiv.appendChild(holder);
    }

    for(var j = 0; j < lettersGuessed.length; j++){
        var holder = document.createElement("span");
        holder.textContent = lettersGuessed[j] + " ";
        usedDiv.appendChild(holder);
    }

    var remGuessTxt = document.createElement("span");
    remGuessTxt.textContent = remainingGuesses;
    remainingDiv.appendChild(remGuessTxt);
}

function updateDispArr(key){
    var occurences = [];
    for(var i = 0; i < currArray.length; i++){
        if(key === currArray[i]){
            occurences.push(i);
        }
    }

    for(var i = 0; i < occurences.length; i++){
        var index = occurences[i]
        dispArray[index] = key; 
    }
}

function newWord() {
    
    remainingGuesses = 15;
    dispArray = [];
    currArray = [];
    lettersGuessed = [];
    resultsDiv.innerHTML = "";

    currentWord = wordBank[Math.floor(Math.random()* wordBank.length)];
    console.log(currentWord);

    for(var i =0; i < currentWord.length; i++){
        dispArray.push("_");
        currArray.push(currentWord.charAt(i))
    }

    console.log(dispArray);

    updateDisplay();
}

function checkWin(arr1, arr2){
    if(currArray.length !== dispArray.length){
        return false;
    } else {
        for(i = 0; i < currArray.length; i++){
            if(currArray[i] !== dispArray[i]){
                return false;
            }
        }
    }

    return true;
}

function sendFailMessage(){

    var message = document.createElement("h3");
    message.textContent = "You ran out of guesses! Press any key to try again!"
    resultsDiv.appendChild(message);
}

function sendWinMessage(){
    var message = document.createElement("h3");
    message.textContent = "You win! Press any key to play again!"
    resultsDiv.appendChild(message);
}

function checkGuess(key) {
    if(currArray.includes(key)){
        updateDispArr(key);
        console.log(dispArray);
        console.log(currArray);
    } else {
        if(!lettersGuessed.includes(key)){
            lettersGuessed.push(key);
        }
        remainingGuesses--;
    }

    if(remainingGuesses <= 0){
        sendFailMessage();
        running = false;
    }

    updateDisplay();
}

document.addEventListener("keypress", function(e) {
    var pressedKey = String.fromCharCode(e.which).toLowerCase();
    console.log(pressedKey);

    if(!running) {
        running = true;
        newWord()
    } else {
        checkGuess(pressedKey);
    }

    if(checkWin()){
        wins++;
        sendWinMessage();
        updateWins();
        running = false;
    }
})