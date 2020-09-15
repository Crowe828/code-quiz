// The timer ends when all questions have been answered or the timer reaches 0.
// After the game ends, the user can save their initials and score to a highscores view using local storage.
// Repository contains quality README with description, screenshot, link to deployed application.

console.log(questions);

var displayQuestionEl = document.querySelector(".display-questions");
var timerEl = document.querySelector(".timer");
var resultsEl = document.querySelector(".results");
var answersEl = document.querySelector(".answers");

var mainDisplay = document.createElement("h3");
var startBtn = document.createElement("button");

var timer = 60;
var index = 0;

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
    timerEl.textContent = timer;

    var questionTimer = setInterval(function(){

        timer--
        timerEl.textContent = timer;

        if (timer <= 0) {
            clearInterval(questionTimer);
        }
    }, 1 * 1000);

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
        // answersEl.textContent = "Correct!";
        console.log("correct");
        
        function fadeOut() {
            answersEl.textContent = "Correct!";
        }
        setTimeout(fadeOut);
        
    }
    else {
        // answersEl.textContent = "Incorrect!";
        timer = (timer - 5);
        console.log("incorrect");

        function fadeOut() {
            answersEl.textContent = "Incorrect!";
        }
        setTimeout(fadeOut);
    }

    index++;
    nextQuestion();
}



startBtn.addEventListener("click", startQuiz);
openingPage();