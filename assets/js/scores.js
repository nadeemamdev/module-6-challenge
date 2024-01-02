// scores.js

document.addEventListener("DOMContentLoaded", function () {
    const highscoresList = document.getElementById("highscoresList");
    const clearButton = document.getElementById("clear");
  
    // Get high scores from local storage or initialize an empty array
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  
    // Display high scores on the leaderboard
    function displayHighscores() {
      // Clear existing list
      highscoresList.innerHTML = "";
  
      // Sort high scores by score in descending order
      const sortedHighscores = highscores.sort((a, b) => b.score - a.score);
  
      // Display each high score on the leaderboard
      sortedHighscores.forEach((entry, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${entry.initials} - ${entry.score}`;
        highscoresList.appendChild(listItem);
      });
    }
  
    // Clear high scores from local storage and update the leaderboard
    function clearHighscores() {
      localStorage.removeItem("highscores");
      displayHighscores();
    }
  
    // Event listener for the clear button
    clearButton.addEventListener("click", clearHighscores);
  
    // Display high scores when the page loads
    displayHighscores();
  });
  
