// JavaScript for Code Quiz
console.log(questions);

var displayQuestionEl = document.querySelector(".display-questions");
var timerEl = document.querySelector(".timer");
var resultsEl = document.querySelector(".results");

var mainDisplay = document.createElement("h3");
var startBtn = document.createElement("button");
var submitBtn = document.createElement("button");
var initialsBox = document.createElement("input");

var timer = 75;
var index = 0;
var questionTimer;

function openingPage() {
    mainDisplay.textContent = "Press the button to start";
    startBtn.textContent = "Start";
    displayQuestionEl.append(mainDisplay, startBtn);
}

function startQuiz() {
    showTimer();
    nextQuestion();
}

function showTimer() {
    timerEl.textContent = ("Time Remaining: " + timer);

    questionTimer = setInterval(function(){

        if (timer < 0) {
            timer = 0;
        }

        timer--
        timerEl.textContent = ("Time Remaining: " + timer);

        if (timer <= 0  || index >= questions.length) {
            clearInterval(questionTimer);
            scoreBoard();
        }

    }, 1000);

}

function nextQuestion() {
   var currentQuestion = questions[index];

    console.log(currentQuestion);

    displayQuestionEl.textContent = "";

    mainDisplay.textContent = currentQuestion.title;
    displayQuestionEl.append(mainDisplay);
    var choicesContainer = document.createElement("div");
    for (let i = 0; i < currentQuestion.choices.length; i++) {
        var choiceBtn = document.createElement("button");

        choiceBtn.textContent = currentQuestion.choices[i];

        choiceBtn.addEventListener("click", checkAnswer);

        choicesContainer.append(choiceBtn);
    }

    displayQuestionEl.append(choicesContainer)
}

function checkAnswer(event) {
    var responseText = event.target.textContent;
    console.log(responseText);

    if (responseText === questions[index].answer) {
        resultsEl.textContent = "Correct!";
        console.log("correct");
        resultsEl;
    }
    else {
        resultsEl.textContent = "Incorrect!";
        timer = (timer - 5);
        console.log("incorrect");
        resultsEl;
    }

    index++;
    nextQuestion();
}

// Once timer runs out, display the user's final score
function scoreBoard() {
    mainDisplay.textContent = "Great job!";
    timerEl.textContent = ("Your final score is: " + timer);
    resultsEl.textContent = "Please enter your initials to save your high score: ";

    // Have a text field where they can save their initials
    initialsBox.textContent = "Initials";
    submitBtn.textContent = "Submit";

    // Use localStorage to save the users score and initials

    displayQuestionEl.append(mainDisplay, timerEl, resultsEl, initialsBox, submitBtn);
}

startBtn.addEventListener("click", startQuiz);
openingPage();