// Event listener to wait for the HTML document to fully load before executing JavaScript
document.addEventListener("DOMContentLoaded", function () {
    // Get references to various elements using their IDs
    const highscoresList = document.getElementById("highscoresList");
    const clearButton = document.getElementById("clear");
  
    // Get high scores from local storage or initialize an empty array if none exist
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  
    // Function to display high scores on the leaderboard
    function displayHighscores() {
      // Clear the existing list to avoid duplicates
      highscoresList.innerHTML = "";
  
      // Sort high scores by score in descending order
      const sortedHighscores = highscores.sort((a, b) => b.score - a.score);
  
      // Display each high score on the leaderboard
      sortedHighscores.forEach((entry, index) => {
        // Create a list item for each high score
        const listItem = document.createElement("li");
        listItem.textContent = `${entry.initials} - ${entry.score}`;
  
        // Append the list item to the highscores list
        highscoresList.appendChild(listItem);
      });
    }
  
    // Function to clear high scores from local storage and update the leaderboard
    function clearHighscores() {
      // Remove high scores from local storage
      localStorage.removeItem("highscores");
  
      // Update the displayed highscores
      displayHighscores();
    }
  
    // Event listener for the clear button to trigger the clearHighscores function
    clearButton.addEventListener("click", clearHighscores);
  
    // Display high scores when the page loads
    displayHighscores();
  });
  