var preGame = document.getElementById("pre-game");
var game = document.getElementById("game");
var gameEnd = document.getElementById("game-end");
var startButton = document.getElementById("start");
var highScoresButton = document.getElementById("hs-button");
var timer;
var timeLeft = 60;
var currentQuestionIndex = 0;

var questions = [
    {
        question: "What is JavaScript?",
        answers: ["A programming language", "A type of coffee", "A fruit"],
        correctAnswer: 0
    },
    {
        question: "What does 'DOM' stand for?",
        answers: ["Document Object Model", "Digital Object Model", "Data Object Management"],
        correctAnswer: 0
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        answers: ["var", "let", "const"],
        correctAnswer: 0
    },
    {
        question: "What is a closure in JavaScript?",
        answers: ["A function that has access to variables from its outer scope", "A way to close a web page", "A type of loop"],
        correctAnswer: 0
    },
    {
        question: "Which method is used to add an element to the end of an array?",
        answers: [".push()", ".pop()", ".concat()"],
        correctAnswer: 0
    },
    {
        question: "What is an 'if' statement used for in JavaScript?",
        answers: ["Conditional execution of code", "Looping through arrays", "Declaring a function"],
        correctAnswer: 0
    }
];

startButton.addEventListener("click", startGame);

highScoresButton.addEventListener("click", function () {
    window.location.href = "highscores.html"; // Redirect to highscores.html
});


function startGame() {
    preGame.setAttribute("class", "is-inactive");
    game.setAttribute("class", "is-active");
    startTimer();
    displayNextQuestion();
}

function displayNextQuestion() {
    if (currentQuestionIndex < questions.length && timeLeft > 0) {
        var currentQuestion = questions[currentQuestionIndex];
        var questionElement = document.createElement("div");
        questionElement.textContent = currentQuestion.question;
        game.innerHTML = ""; // Clear the game content before displaying the next question
        game.appendChild(questionElement);

        var answerChoices = document.createElement("ul");
        for (var i = 0; i < currentQuestion.answers.length; i++) {
            var choice = document.createElement("li");
            choice.textContent = currentQuestion.answers[i];
            answerChoices.appendChild(choice);
        }
        game.appendChild(answerChoices);

        // Attach a click event listener to each answer choice
        var choices = answerChoices.querySelectorAll("li");
        choices.forEach(function (choice) {
            choice.addEventListener("click", function (event) {
                handleUserInput(event.target.textContent);
            });
        });
    } else {
        if (timeLeft <= 0 || currentQuestionIndex === questions.length) {
            clearInterval(timer);
            game.setAttribute("class", "is-inactive");
            gameEnd.setAttribute("class", "is-active");
            endGame();
            console.log("You ran out of time or answered all questions.");
        }
    }
}



function endGame() {
    clearInterval(timer);
    game.setAttribute("class", "is-inactive");
    gameEnd.setAttribute("class", "is-active");
    var initialsInput = document.getElementById("initials");
    var submitButton = document.getElementById("submit");
    console.log("endGame() called");

    if (submitButton) {
        submitButton.addEventListener("click", function () {
            var initials = initialsInput.value.trim();
            if (initials !== "") {
                var playerScore = calculateScore();
                var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
                var newScore = {
                    initials: initials,
                    score: playerScore
                };
                highScores.push(newScore);
                localStorage.setItem("highScores", JSON.stringify(highScores));
                viewHiScore();
            } else {
                alert("Please enter your initials.");
            }
        });
    }
}

function handleUserInput(answer) {
    if (currentQuestionIndex < questions.length && timeLeft > 0) {
        var currentQuestion = questions[currentQuestionIndex];
        if (answer === currentQuestion.answers[currentQuestion.correctAnswer]) {
            // Correct answer logic
        } else {
            timeLeft -= 10;
        }
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            displayNextQuestion();
        } else {
            // Check if the timer has run out
            if (timeLeft <= 0) {
                endGame();
                console.log("You ran out of time!");
            }
        }
    }
}

function startTimer() {
    timer = setInterval(function () {
        timeLeft--;
        var timerDisplay = document.getElementById("timer");
        if (timerDisplay) {
            timerDisplay.textContent = "Time: " + timeLeft + " seconds";
        }
        if (timeLeft <= 0 || currentQuestionIndex >= questions.length) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

function calculateScore() {
    // Calculate the score based on the remaining time
    var maxTime = 60; // Maximum time allowed
    var timeSpent = maxTime - timeLeft; // Calculate time spent
    var score = Math.max(0, Math.round((timeSpent / maxTime) * 100)); // Calculate score as a percentage

    return score;
}

function viewHiScore() {
    preGame.setAttribute("class", "is-inactive");
    game.setAttribute("class", "is-inactive");
    gameEnd.setAttribute("class", "is-inactive");
    hiScore.setAttribute("class", "is-active");
}

// Implement the game logic, including tracking time and ending the game

// Start the game when the "Start" button is clicked
startButton.addEventListener("click", startGame);
