// JavaScript for Code Quiz

// Log to make sure the application opened correctly
console.log(questions.length + " questions, good to go.");

// Timer starts at 75 seconds, starts counting down as soon as the user presses start
var timerEl = document.querySelector(".timer");
// Displays each question
var displayQuestionEl = document.querySelector(".display-questions");
// Displays whether the answer to each question was correct or incorrect
var answersEl = document.querySelector(".answers");
// Final score at the end of the quiz
var scoreEl = document.querySelector(".score");

// Creates an h3 which will be used for a variety of text
var mainDisplay = document.createElement("h3");
// Button to start the quiz
var startBtn = document.createElement("button");
startBtn.style.backgroundColor = "#90ee90";
startBtn.style.padding = "5px";
startBtn.style.borderRadius = "8px";
// List to display scoreboard on screen
var highScoreList = document.createElement("ol");

// Counts down from 75 seconds. 5 seconds are deducted for every incorrect answer
var timer = 75;
// Will be used to index the questions array in the questions.js file
var index = 0;
// Global empty variable for the timer to equal whatever we need it to within each function
var questionTimer;
// Global empty variable for the users score
var score;
// Empty array which will hold the users score and initials
var highScores = [];

// First page that you see upon starting the quiz
function openingPage() {
  // Gives user instructions on how to complete quiz
  mainDisplay.textContent =
    "Your challenge: Correctly answer these ten questions! You have 75 seconds. Five seconds will be deducted for every incorrect answer, be careful! At the end of the quiz, enter your initials to log your final score!";

  // Press this buttion to begin the quiz
  startBtn.textContent = "Start Quiz";

  // Appends the instructions and start button to the display-questions div
  displayQuestionEl.append(mainDisplay, startBtn);
}

// Once the user presses start, the timer and first question are displayed
function startQuiz() {
  showTimer();
  nextQuestion();
}

// Timer starts at 75 seconds. Time at end of quiz will be the users score
function showTimer() {
  // Tells the user how much time they have left to finish
  timerEl.textContent = "Time Remaining: " + timer;

  // Makes the timer count down in seconds
  questionTimer = setInterval(function () {
    // If your timer somehow drops below zero, it will be equal to zero
    if (timer < 0) {
      timer = 0;
    }

    timer--;
    timerEl.textContent = "Time Remaining: " + timer;

    // Timer will stop counting once it has reached zero or when the user has finished the quiz
    if (timer <= 0 || index >= questions.length) {
      clearInterval(questionTimer);
      // Either way they will be taken to the user score page
      userScore();
    }
  }, 1000);
}

// Function to make sure after every question the next one loads correctly
function nextQuestion() {
  // Referencing questions found in my questions.js file
  var currentQuestion = questions[index];

  // Displays current question in the log to make sure everything is working correctly
  console.log(currentQuestion);

  // Left blank so it can be appended with the questions
  displayQuestionEl.textContent = "";

  // Replaces the quiz instructions with the questions
  mainDisplay.textContent = currentQuestion.title;

  // Append both of those changes to the display-questions div
  displayQuestionEl.append(mainDisplay);

  // Div which will hold each question
  var choicesContainer = document.createElement("div");

  // Creates a button for each answer choice
  for (let i = 0; i < currentQuestion.choices.length; i++) {
    // Creates a button for each answer
    var choiceBtn = document.createElement("button");
    choiceBtn.style.backgroundColor = "#90ee90";
    choiceBtn.style.borderRadius = "8px";
    choiceBtn.style.backgroundColor = "#90ee90";
    choiceBtn.style.padding = "5px";
    choiceBtn.style.margin = "5px";

    //     padding: 15px 32px;
    //     text - align: center;
    //     text - decoration: none;
    //     display: inline - block;
    //     font - size: 20px;
    // }

    // Adds each answer choice to a button
    choiceBtn.textContent = currentQuestion.choices[i];

    // If a button is clicked, check if it's correct
    choiceBtn.addEventListener("click", checkAnswer);

    // Appends answer buttons to the choices container
    choicesContainer.append(choiceBtn);
  }

  // Appends all of this to the screen
  displayQuestionEl.append(choicesContainer);
}

// Checks whether each answer is correct or not
function checkAnswer(event) {
  // Tracks each answer the user chooses
  var responseText = event.target.textContent;
  // Displays their choice in the console
  console.log(responseText);

  // If their answer is correct, let them know
  if (responseText === questions[index].answer) {
    answersEl.textContent = "Correct!";
    // Log it
    console.log("correct");
    answersEl;
  }
  // If their answer is incorrect, let them know and subtract five seconds
  else {
    answersEl.textContent = "Incorrect!";
    timer = timer - 5;
    // Log it
    console.log("incorrect");
    answersEl;
  }

  // Cycles through each question and displays the next question
  index++;
  nextQuestion();
}

// Once timer runs out, display the user's final score
function userScore() {
  // Explains how to save their score
  var submitExplain = document.createElement("p");

  // Form to submit initials to localStorage
  var submitForm = document.createElement("form");
  submitForm.setAttribute("id", "input-form");

  // Label for form
  var submitLabel = document.createElement("label");
  submitLabel.textContent = "Initials: ";

  // Text box where you enter your initials
  var inputBox = document.createElement("input");
  inputBox.setAttribute("type", "text");
  inputBox.setAttribute("name", "initials");

  // Button to submit your initials and score
  var inputBtn = document.createElement("input");
  inputBtn.setAttribute("type", "submit");
  inputBtn.style.backgroundColor = "#90ee90";
  inputBtn.style.borderRadius = "4px";
  inputBtn.style.backgroundColor = "#90ee90";
  inputBtn.style.padding = "5px";
  inputBtn.style.margin = "5px";

  // Append the label, input, and button field to a form
  submitForm.append(submitLabel, inputBox, inputBtn);

  // When the timer stops, that is the user's score
  score = timer;
  console.log(score);

  // Wipes previous text and start fresh
  displayQuestionEl.textContent = "";
  // Hides timer
  timerEl.style.display = "none";
  // Hides correct/incorrect
  answersEl.style.display = "none";

  // Congratulates the user for finishing
  mainDisplay.textContent = "Great job!";
  // Displays their final score
  scoreEl.textContent = "Final Score: " + score;
  // Instructs user to enter their initials to save their score
  submitExplain.textContent = "Please enter your initials to save your score.";

  // Append the final score and form to displayQuestionEl
  displayQuestionEl.append(
    timerEl,
    mainDisplay,
    scoreEl,
    submitExplain,
    submitForm
  );

  // When the user clicks submit, store their initials and score in localStorage
  submitForm.onsubmit = function (event) {
    event.preventDefault();

    // Check if there's anything in localStorage already
    var storedScores = JSON.parse(localStorage.getItem("scores"));
    // If scores have already been stored
    if (storedScores !== null) {
      // Give storedInfo everything stored in the highScores array
      highScores = storedScores;
    }

    // Stores initials and score
    var highScoresObj = {
      name: submitForm.initials.value,
      points: score,
    };

    // Push highScoresObj into highScores array
    highScores.push(highScoresObj);
    console.log(highScoresObj);

    // Turn the user's score into a string and save it to localStorage
    localStorage.setItem("scores", JSON.stringify(highScores));

    leaderboard();
  };
}

function leaderboard() {
  displayQuestionEl.textContent = "";

  mainDisplay.textContent = "Scoreboard";

  // Retrieve scores from localStorage and display it on the screen
  highScores = JSON.parse(localStorage.getItem("scores"));
  console.log(highScores);

  // Display each value within the highSchores array as a list
  for (var i = 0; i < highScores.length; i++) {
    var scoreboard = highScores[i];

    var li = document.createElement("li");
    li.textContent = scoreboard.points;
    li.setAttribute("data-index", i);
    highScoreList.appendChild(li);
  }

  // Append everything to the page
  displayQuestionEl.append(mainDisplay, highScoreList);
}

// When the start button is clicked, the quiz starts
startBtn.addEventListener("click", startQuiz);
openingPage();
