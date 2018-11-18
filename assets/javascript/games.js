
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
var g_UserSelectionArray = [];
var g_UserCorrectSelectionArray = [];

//Game Constants

var MAX_GAMES = 4;
var MAX_GUESSES = 3;

// Global Variables need to be reset on reset operation;
var g_Guesses = MAX_GUESSES;
var g_Games = MAX_GAMES;
var g_Wins = 0;
var flag_GameChange = true;
var indexQA ;
var g_GamesCounter = 1;
var winAudio = new Audio('./assets/images/Short_triumphal_fanfare.mp3');



/* Global Question object that stores the key value pair, The Key is an index common to both question and answer 
objects value would be question statement asked to user
*/

var QuestionObject = {
    1:"Which fictional city is the home of Batman?",
    2:"Spinach is high in which mineral?",
    3:"What is a Geiger Counter used to detect?",
    4:"Which type of dog has breeds called Scottish, Welsh and Irish?",
    5:"Babe Ruth is associated with which sport?",
    6:"In the film Babe, what type of animal was Babe?",
    7:"Which Roman emperor supposedly fiddled while Rome burned?",
    8:"What is the name of the fairy in Peter Pan?",
    9:"Traditionally, how many Wonders of the World are there?",
    10:"Which is the tallest mammal?",
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
    6:"Pig",
    7:"Nero",
    8:"Tinkerbell",
    9:"Seven",
    10:"Giraffe",
    //getAnswer function returns the Answer statement based on Key passed to it
    getAnswer: function(keyIndex){
    return AnswerObject[keyIndex];
    }
};





// Before we have a onkeyup event the indexQA should be selected and question identified done in newGame() function;
newGame();

// Next, we give JavaScript a function to execute when onkeyup event fires.

 document.onkeyup = function(event) {

    v_Wins.textContent = g_Wins;
    v_gameCount.textContent = g_GamesCounter;
    v_Games.textContent = g_Games;
    v_KeyEntered = event.key.toLocaleUpperCase();
    v_UserSelection.textContent = v_KeyEntered; 
    displayMatchedTypedLetter();
    console.log(event.key);
    updateUserSelection(v_KeyEntered, event.keyCode);
    displayUserSelections();

   // v_EntryMessage.textContent =  "Alphabet typed is " + v_KeyEntered ;
   v_EntryMessage.textContent = "";


// only valid key codes displayed alphabets only
if(event.keyCode >= 65 && event.keyCode <= 90) {

        
    if(g_Games === 0){
        alert("Game Over !!!!, You have played " +MAX_GAMES+" games. \nPlease refresh this page to play a new game");
        //clear all the display values that need not be presented to the user.
        {
            v_GuessRemaining.textContent = 0;  
            v_WordLetter.textContent = "";
            v_Question.textContent = "";
            v_CapturedUserSelection.textContent = "";
            v_gameCount.textContent = MAX_GAMES;
            v_EntryMessage.textContent = "";
        }
    }
    else{
        if(g_Guesses === 0 ){
            console.log("Inside g_Guesses <= 0 Block");
            flag_GameChange = true;
            newGame();
            g_Games--;
            // alert("GUESES  is 0 : flag_GameChange: " + flag_GameChange);
            v_Games.textContent =  g_Games ;
            refreshDisplay();
        }
        else{
            flag_GameChange = false;
        //    alert("Inside g_Guesses > 0 Block");
            console.log("Inside g_Guesses > 0 Block");
            if( isLetterPresent(v_KeyEntered, indexQA)/* if the typed key matches the answer presented TRUE or FALSE*/){
             //       alert("isLetterPresent Block");
                    console.log("isLetterPresent Block");
                    updateUserCorrectSelection(v_KeyEntered, indexQA); // Displays the correct value selected
                    displayMatchedTypedLetter(); 
                    /* if the letters entered matched the answer letters*/
                    if( isAnswerMatch(indexQA) ){
                        console.log("isAnswerMatch Block ^^^^^^^^^^^^^^");                        
                        g_Wins++;
                        v_Wins.textContent = g_Wins;
                        v_Games.textContent =  g_Games ;
                        refreshDisplay();
                        flag_GameChange = !flag_GameChange;
                        winAudio.play();
                        alert("You are right, the answer is " + AnswerObject.getAnswer(indexQA));
                        g_Games--;
                        v_Games.textContent =  g_Games ;
                        newGame();
                        console.log(" WHEN LETTERS MATCHED flag_GameChange: "+flag_GameChange);
                    }
                }
                    else{
                        g_Guesses--;
                        v_GuessRemaining.textContent = g_Guesses;
                        refreshDisplay();
                    }
            }
        }
    }
else{
    var strMessage = "Please enter letters only !!!!";
    if(g_Games === 0){
        v_EntryMessage.textContent = "";
    }
    else{
        v_EntryMessage.textContent = strMessage;
    };
} ; 
};


//1: updateUserSelection function takes the letter pressed in keyboard and appends it to user pressed keys array
function updateUserSelection(letter, letter_keyCode){
    console.log("Inside updateUserSelection(letter, letter_keyCode)"); 
  //  if(letter.charCodeAt(0) >= 65 && letter.charCodeAt(0) <= 90){ 
    if(letter_keyCode >= 65 && letter_keyCode <= 90){ 
        console.log("Value selected : " + letter);
        console.log("Keycode Value is : "+ letter_keyCode);
        g_UserSelectionArray[g_UserSelectionArray.length] = letter;
    }
    else{
       // alert("Value selected is NOT a letter !!!!");
    }
};

//2: displayUserSelections function displays all the user character selections made
function displayUserSelections(){
    console.log("Inside displayUserSelections() ");       
     var displaySelection = "";
     for(i=0;i< g_UserSelectionArray.length; i++ ) {
        displaySelection = displaySelection +" " + g_UserSelectionArray[i];
     };
    v_CapturedUserSelection.textContent = displaySelection ;
    };

//3: finds if the letter entered is in answer object and returns a boolean.

function isLetterPresent(letter, keyIndex){
    console.log("Inside findSimilarAnswerCharacter(letter, keyIndex) ");  
    console.log(AnswerObject.getAnswer(keyIndex))   ;
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
    console.log("Inside findSimilarAnswerCharacter(letter, keyIndex) ");       
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


//5: This function displays the matched letter in the screen.
function displayMatchedTypedLetter(){
    console.log("Inside displayMatchedTypedLetter()");    
    var displayString = "";
    for (i = 0; i< g_UserCorrectSelectionArray.length; i++){ 
        displayString = displayString + " " + g_UserCorrectSelectionArray[i];
    }
    v_WordLetter.textContent = displayString;
};


//6: User Selections matched with the answer letters  [PROBLEM DOES NOT RETURN CORRECT TRUE OR FALSE]

function isAnswerMatch(keyIndex){
  var bool = true;
  console.log("Inside isAnswerMatch(keyIndex)");
  for(i=0;i<AnswerObject.getAnswer(keyIndex).length; i++){
        if(AnswerObject.getAnswer(keyIndex)[i].toLocaleUpperCase() === g_UserCorrectSelectionArray[i].toLocaleUpperCase()){
            console.log("g_UserCorrectSelectionArray["+i+"] = "+g_UserCorrectSelectionArray[i]);
           continue;
        }
        else{
            bool = false;
            break;
        }
    }
    return bool;
}

//7. This function dsiplays the user entries in the g_UserCorrectSelectionArray array declaerd globally

function updateUserCorrectSelection(letter, keyIndex){
    console.log("Inside updateUserCorrectSelection()");
    var matchedLetter = findSimilarAnswerCharacter(letter, keyIndex);
    for (i = 0, j = 0; i<AnswerObject.getAnswer(keyIndex).length; i++){
        if( i === matchedLetter[j]){ 
            g_UserCorrectSelectionArray[i] = letter;
            j++;
        }
        else{
            continue  ;          
        };
    };
}


// 8. This is a reset function that initializes the g_Guesses variable to 5, g_UserSelectionArray and g_UserCorrectSelectionArray are initailzed to empty.
function reset(){
    console.log("Inside reset() function");
    g_Guesses = MAX_GUESSES ;
    g_UserSelectionArray = [];
    g_UserCorrectSelectionArray = [];
};


//9. The refreshDisplay function is called to refresh the screen display to user with current values.
function refreshDisplay()
{
    console.log("Inside refreshDisplay()");
    v_Games.textContent =  g_Games ;
    v_GuessRemaining.textContent = g_Guesses;   
    v_Question.textContent = QuestionObject.getQuestion(indexQA);
    displayMatchedTypedLetter();
    displayUserSelections();
    v_Wins.textContent = g_Wins;
    v_gameCount.textContent = g_GamesCounter;
}


//10. The newGame function is called to when a new game needs to be created  with default values and questions.
function newGame(){
    console.log("Inside newGame() ");
    if(flag_GameChange){ //Only creates a index for question/answer when there is a game change
        reset();
        indexQA = Math.ceil(Math.random() * 10);
        v_Question.textContent = QuestionObject.getQuestion(indexQA);
        console.log("New Game Started with indexQA: " + indexQA);
       // v_WordLetter.textContent = AnswerObject.getAnswer(indexQA);
        for(i=0; i < AnswerObject.getAnswer(indexQA).length; i++){
            g_UserCorrectSelectionArray[i] = " _ ";
        };
        if(g_Games === MAX_GAMES){
            g_GamesCounter = 1;
        }
        else if(g_Games === 0 ){
            g_GamesCounter = MAX_GAMES;
            v_GuessRemaining.textContent = 0;  
            v_WordLetter.textContent = "";
            v_Question.textContent = "";
            v_CapturedUserSelection.textContent = "";
            v_gameCount.textContent = MAX_GAMES;
        }
        else{
            g_GamesCounter = MAX_GAMES - g_Games + 1;
        }
        refreshDisplay();
        v_UserSelection.textContent = "";
        v_gameCount.textContent = g_GamesCounter;
        flag_GameChange = !flag_GameChange;
    }
}
