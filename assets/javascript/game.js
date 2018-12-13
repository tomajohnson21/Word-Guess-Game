
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

function updateDisplay() {

    displayDiv.innerHTML = "";
    remainingDiv.innerHTML = "";
    usedDiv.innerHTML = "";
    winDiv.innerHTML = "";

    for(var i = 0; i < dispArray.length; i++) {
        var holder = document.createElement("span");
        holder.textContent = dispArray[i] + " ";
        displayDiv.appendChild(holder);
    }

    for(var j = 0; j < lettersGuessed.length; j++){
        var holder = document.createElement("span");
        holder.textContent = lettersGuessed[i];
        usedDiv.appendChild(holder);
    }

    var remGuessTxt = document.createElement("span");
    remGuessTxt.textContent = remainingGuesses;
    remainingDiv.appendChild(remGuessTxt);

    var winTxt = document.createElement("span");
    winTxt.textContent = wins;
    winDiv.appendChild(winTxt);

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
    
    currentWord = wordBank[Math.floor(Math.random()* wordBank.length)];
    console.log(currentWord);


    for(var i =0; i < currentWord.length; i++){
        dispArray.push("_");
        currArray.push(currentWord.charAt(i))
    }

    console.log(dispArray);

    updateDisplay();
}


function checkWin(){
    if (compareArr(currArray, dispArray)){
        wins++;
        newWord();
    }
}


function checkGuess(key) {
    if(currArray.includes(key)){
        updateDispArr(key);
        console.log(dispArray);
        console.log(currArray);
        console.log(dispArray === currArray);
        checkWin();
    } else {
        if(!lettersGuessed.includes(key)){
            lettersGuessed.push(key);
        }
        remainingGuesses--;
    }

    if(remainingGuesses <= 0){
        newWord();
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
})