// logic.js

document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start");
    const questionsContainer = document.getElementById("questions");
    const choicesContainer = document.getElementById("choices");
    const feedbackContainer = document.getElementById("feedback");
    const timerElement = document.getElementById("time");
  
    let currentQuestionIndex = 0;
    let timeLeft = 60; // Set your desired initial time
    let timerInterval; // Variable to hold the timer interval
  
    // Questions data - Access the questions directly from the window object
    const questionsData = window.questions;
  
    // Function to start the quiz
    function startQuiz() {
      // Hide the start screen and show the questions
      document.getElementById("start-screen").classList.add("hide");
      questionsContainer.classList.remove("hide");
  
      // Start the timer
      startTimer();
  
      // Display the first question
      displayQuestion();
    }
  
    // Function to display a question
    function displayQuestion() {
      const currentQuestion = questionsData[currentQuestionIndex];
  
      // Display question title
      document.getElementById("question-title").textContent = currentQuestion.question;
  
      // Display choices
      choicesContainer.innerHTML = "";
      currentQuestion.choices.forEach((choice, index) => {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        choiceButton.addEventListener("click", () => checkAnswer(index));
        choicesContainer.appendChild(choiceButton);
      });
    }
  
    // Function to check the selected answer
    function checkAnswer(selectedIndex) {
      const currentQuestion = questionsData[currentQuestionIndex];
  
      if (selectedIndex === currentQuestion.correctAnswer) {
        // Correct answer
        // Additional logic for correct answer (e.g., score handling)
      } else {
        // Incorrect answer
        // Subtract time for incorrect answer
        timeLeft -= 10;
      }
  
      // Move to the next question or end the game
      currentQuestionIndex++;
      if (currentQuestionIndex < questionsData.length) {
        displayQuestion();
      } else {
        endGame();
      }
    }
  
    // Function to end the game
    function endGame() {
      // Stop the timer
      clearInterval(timerInterval);
  
      // Prompt the user for initials
      const userInitials = prompt("Enter your initials (max 3 characters):");
  
      if (userInitials) {
        // Create a high score entry
        const scoreEntry = {
          initials: userInitials.substring(0, 3), // Save only the first three initials
          score: timeLeft, // You can customize this based on your scoring mechanism
        };
  
        // Get existing high scores from local storage or initialize an empty array
        const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  
        // Add the new score entry to the array
        highscores.push(scoreEntry);
  
        // Save the updated high scores to local storage
        localStorage.setItem("highscores", JSON.stringify(highscores));
  
        // Display the high scores page or perform any other end game actions
        window.location.href = "highscores.html";
      }
    }
  
    // Function to start the timer
    function startTimer() {
      timerInterval = setInterval(function () {
        timerElement.textContent = timeLeft;
  
        if (timeLeft <= 0) {
          endGame();
        }
  
        timeLeft--;
      }, 1000);
    }
  
    // Event listener for the start button
    startButton.addEventListener("click", startQuiz);
  });
  