// Get DOM elements
var highScoreList = document.querySelector("ul");

// Retrieve high scores from local storage
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// Display high scores
highScores.sort(function (a, b) {
    return b.score - a.score; // Sort scores in descending order
});

for (var i = 0; i < highScores.length; i++) {
    var scoreItem = document.createElement("li");
    scoreItem.textContent = highScores[i].initials + " - " + highScores[i].score;
    highScoreList.appendChild(scoreItem);
}

// Implement any additional functionality for the high scores page
