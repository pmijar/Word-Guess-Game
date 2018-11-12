
// Let's start by grabbing a reference to the <span> below and storing in a variable.
var v_Wins = document.getElementById("Wins");
var v_GuessRemaining = document.getElementById("GuessRemaining");
var v_Question = document.getElementById("Question");
var v_WordLetter = document.getElementById("WordLetter");
var v_UserSelection = document.getElementById("UserSelection");
var v_CapturedUserSelection = document.getElementById("CapturedUserSelection");



// Global Array to store the selection made by user on key down
var v_UserSelectionArray = [];


/* Global Question object that stores the key value pair, 
The Key is an index common to both question and answer 
objects value would be question statement asked to user
*/

var QuestionObject = {
    1:"Which fictional city is the home of Batman?",
    2:"Spinach is high in which mineral?",
    3:"What is a Geiger Counter used to detect?",
    4:"Which type of dog has breeds called Scottish, Welsh and Irish?",
    5:"Babe Ruth is associated with which sport?"
}

/* Global Answer object that stores the key value pair, 
The Key is an index common to both question and answer 
objects value would be answer to the quesion asked to the user
*/

var AnswerObject = {
    1:"Gotham",
    2:"Iron",
    3:"Radiation",
    4:"Terrier",
    5:"Baseball"
}


// Next, we give JavaScript a function to execute when onkeyup event fires.
document.onkeyup = function(event) {
    v_UserSelection.textContent = event.key.toLocaleUpperCase();
    v_Wins.textContent = event.keyCode;
    v_KeyEntered = event.key.toLocaleUpperCase();
    console.log(event.key);
    updateUserSelection(v_KeyEntered);
    displayUserSelections();
    var indexQA = Math.round(Math.random() * 5);
    v_Question.textContent = getQuestion(indexQA);
    v_WordLetter.textContent = getAnswer(indexQA);
 
};

//updateUserSelection function takes the letter pressed in keyboard and appends it to user pressed keys
function updateUserSelection(letter ){
    v_UserSelectionArray[v_UserSelectionArray.length] = letter;
};

function displayUserSelections(){
     var displaySelection = "";
     for(i=0;i< v_UserSelectionArray.length; i++ ) {
        displaySelection = displaySelection +" " + v_UserSelectionArray[i];
     };
    v_CapturedUserSelection.textContent = displaySelection ;
    };

function getQuestion(keyIndex){
    return QuestionObject[keyIndex];
}

function getAnswer(keyIndex){
    return AnswerObject[keyIndex];
}

function findSimilarAnswerCharacter(letter, keyIndex){
    var str = getAnswer(keyIndex);
    var letterIndexArray = [];
    for(i=0, j=0;i<str.length; i++){
        if(str.charAt(i).toLocaleUpperCase == letter)
        {     
        letterIndexArray[j] = i;
        console.log(i);
        j++;
        }
    }
    return letterIndexArray;
}

