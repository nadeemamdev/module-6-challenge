// scores.js

// Function to get high scores from local storage
function getHighScores() {
    var highScores = localStorage.getItem("highScores");
    return highScores ? JSON.parse(highScores) : [];
}

// Function to save a new high score to local storage
function saveHighScore(initials, score) {
    var highScores = getHighScores();
    highScores.push({ initials: initials, score: score });
    highScores.sort((a, b) => b.score - a.score); // Sort scores in descending order
    highScores = highScores.slice(0, 5); // Keep only the top 5 scores
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

// Export the functions (if you're using Node.js/CommonJS syntax)
// module.exports = { getHighScores, saveHighScore };
