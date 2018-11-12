
// Let's start by grabbing a reference to the <span> below and storing in a variable.
var v_Wins = document.getElementById("Wins");
var v_GuessRemaining = document.getElementById("GuessRemaining");
var v_Question = document.getElementById("Question");
var v_WordLetter = document.getElementById("WordLetter");
var v_UserSelection = document.getElementById("UserSelection");
var v_CapturedUserSelection = document.getElementById("CapturedUserSelection");
var v_EntryMessage = document.getElementById("entryMessage");
var v_Games = document.getElementById("Games");
var v_gameCount = document.getElementById("gameCount");


// Global Array to store the selection made by user on key down
var v_UserSelectionArray = [];
var testing = [];


// Global Variables need to be reset on reset operation;
var g_Guesses = 5;
var g_Games = 3;
var g_Wins = 0;
var flag_GameChange = true;
var indexQA ;
//var displayLetters = [];
var v_UserCorrectSelectionArray = [];

// common functions used
// Reset function to reset all the variables after every game

function reset(){
    g_Guesses = 5 ; ;
    alert("In Reset Function : g_Guesses = " + g_Guesses + " g_Wins = " + g_Wins);
    v_UserSelectionArray = [];
    v_UserCorrectSelectionArray = [];
    v_GuessRemaining.textContent = g_Guesses;
};



/* Global Question object that stores the key value pair, The Key is an index common to both question and answer 
objects value would be question statement asked to user
*/

var QuestionObject = {
    1:"Which fictional city is the home of Batman?",
    2:"Spinach is high in which mineral?",
    3:"What is a Geiger Counter used to detect?",
    4:"Which type of dog has breeds called Scottish, Welsh and Irish?",
    5:"Babe Ruth is associated with which sport?",

    //getQuestion function returns the Question statement based on Key passed to it

    getQuestion: function (keyIndex){
        return QuestionObject[keyIndex];
    }
};

/* Global Answer object that stores the key value pair, The Key is an index common to both question and answer 
objects value would be answer to the quesion asked to the user
*/

var AnswerObject = {
    1:"Gotham",
    2:"Iron",
    3:"Radiation",
    4:"Terrier",
    5:"Baseball",

    //getAnswer function returns the Answer statement based on Key passed to it
    getAnswer: function(keyIndex){
    return AnswerObject[keyIndex];
    }
};

// Next, we give JavaScript a function to execute when onkeyup event fires.

v_gameCount.textContent = g_Games;
v_Wins.textContent = g_Wins;

document.onkeyup = function(event) {
    v_Wins.textContent = g_Wins;
    v_gameCount.textContent = g_Games;
    v_Games.textContent = g_Games;
    v_KeyEntered = event.key.toLocaleUpperCase();
    v_UserSelection.textContent = v_KeyEntered; 


if(event.keyCode >= 65 && event.keyCode <= 90) {

    console.log(event.key);
    updateUserSelection(v_KeyEntered);
    displayUserSelections();

    v_EntryMessage.textContent =  "You typed : " + v_KeyEntered ;

   // displayMatchedTypedLetter(v_KeyEntered, indexQA);

    if(flag_GameChange){ //Only creates a index for question/answer when there is a game change
        reset();
        refreshDisplay();
        indexQA = Math.round(Math.random() * 5);
        v_Question.textContent = QuestionObject.getQuestion(indexQA);
        v_WordLetter.textContent = AnswerObject.getAnswer(indexQA);
        for(i=0; i < AnswerObject.getAnswer(indexQA).length; i++){
            v_UserCorrectSelectionArray[i] = " _ ";
        };
    }

        
    if(g_Games <= 0){
        alert("Game Over !!!!");
        return "Game Over"; // Game Over
    }
    else{
        if(g_Guesses <= 0 ){
            console.log("Inside g_Guesses <= 0 Block");
            flag_GameChange = true;
            g_Games = g_Games - 1; // No of guess is zero so the user game count is decreased
            v_Games.textContent =  g_Games ;
            refreshDisplay();
            return; // break of this block of code
        }
        else{
            flag_GameChange = false;
            alert("Inside g_Guesses > 0 Block");
            console.log("Inside g_Guesses > 0 Block");
            if( isLetterPresent(v_KeyEntered, indexQA)/* if the typed key matches the answer presented TRUE or FALSE*/){
                    alert("isLetterPresent Block");
                    console.log("isLetterPresent Block");
                    updateUserCorrectSelection(v_KeyEntered, indexQA); // Displays the correct value selected
                    displayMatchedTypedLetter(v_KeyEntered, indexQA); 
                    /* if the letters entered matched the answer letters*/
                    if( isAnswerMatch(indexQA) ){
                        alert("isAnswerMatch Block ^^^^^^^^^^^^^^");
                        console.log("isAnswerMatch Block");                        
                        g_Wins = g_Wins + 1;
                        v_Wins.textContent = g_Wins;
                        g_Games = g_Games - 1; // No of guess is zero so the user game count is decreased
                        v_Games.textContent =  g_Games ;
                        refreshDisplay();
                        flag_GameChange = true;
                        return;
                    }
                }
                    else{
                        g_Guesses = g_Guesses - 1;
                        v_GuessRemaining.textContent = g_Guesses;
                        refreshDisplay();
                    }
            }
        }
    }
else{
    v_EntryMessage.textContent = "Please enter characters only !!!!";
   // return;
}  

};


//1: updateUserSelection function takes the letter pressed in keyboard and appends it to user pressed keys array
function updateUserSelection(letter ){
    v_UserSelectionArray[v_UserSelectionArray.length] = letter;
};

//2: displayUserSelections function displays all the user character selections made
function displayUserSelections(){
     var displaySelection = "";
     for(i=0;i< v_UserSelectionArray.length; i++ ) {
        displaySelection = displaySelection +" " + v_UserSelectionArray[i];
     };
    v_CapturedUserSelection.textContent = displaySelection ;
    };

//3: finds if the letter entered is in answer object and returns a boolean.

function isLetterPresent(letter, keyIndex){
    for(i = 0; i < AnswerObject.getAnswer(keyIndex).length; i++){
        if(AnswerObject.getAnswer(keyIndex)[i].toLocaleUpperCase() == letter)
        { 
         console.log("isLetterPresent : True")    ;  
         return true;
        };
    };
    console.log("isLetterPresent : False")  ;
    return false;
};


//4: finds if the letter entered as same letters available in answer object and returns a position index array.
function findSimilarAnswerCharacter(letter, keyIndex){
    var j = 0;
    var letterIndexArray = [];
    for(i=0; i < AnswerObject.getAnswer(keyIndex).length; i++){
        if(AnswerObject.getAnswer(keyIndex)[i].toLocaleUpperCase() == letter)
        {       
        letterIndexArray[j] = i;
        console.log(i);
        j++;
        };
    };
    return letterIndexArray;
};


//5: 
function displayMatchedTypedLetter(letter, keyIndex){
    var displayString = "";
    for (i = 0; i< v_UserCorrectSelectionArray.length; i++){ 
        displayString = displayString + " " + v_UserCorrectSelectionArray[i];
    }
    v_WordLetter.textContent = displayString;
};


//6: User Selections matched with the answer letters  [PROBLEM DOES NOT RETURN CORRECT TRUE OR FALSE]

function isAnswerMatch(keyIndex){
  var bool;
  for(i=0;i<AnswerObject.getAnswer(keyIndex).length; i++){
        if(AnswerObject.getAnswer(keyIndex)[i] == v_UserCorrectSelectionArray[i]){
            console.log("v_UserCorrectSelectionArray["+i+"] = "+v_UserCorrectSelectionArray[i]);
            bool = true;
            continue;
        }
        else{
            bool = false;
            break;
        }
    }
    alert("isAnswerMatch Function call bool : " + bool);
    return bool;
}

function updateUserCorrectSelection(letter, keyIndex){
    var matchedLetter = findSimilarAnswerCharacter(letter, keyIndex);
    for (i = 0, j = 0; i<AnswerObject.getAnswer(keyIndex).length; i++){
        if( i === matchedLetter[j]){ 
            v_UserCorrectSelectionArray[i] = letter;
            j++;
        }
        else{
            continue  ;          
        };
    };
}

function reset(){
    g_Guesses = 5 ;
    g_Wins = 0 ;
    v_UserSelectionArray = [];
    v_UserCorrectSelectionArray = [];
};

function refreshDisplay()
{
    v_Games.textContent =  g_Games ;
    v_GuessRemaining.textContent = g_Guesses;   
    v_Wins.textContent = g_Wins;
}