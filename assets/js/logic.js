// Event listener to wait for the HTML document to fully load before executing JavaScript
document.addEventListener("DOMContentLoaded", function () {
    // Get references to various elements using their IDs
    const startButton = document.getElementById("start");
    const questionsContainer = document.getElementById("questions");
    const choicesContainer = document.getElementById("choices");
    const feedbackContainer = document.getElementById("feedback");
    const timerElement = document.getElementById("time");
  
    // Initialize variables for controlling quiz flow and timer
    let currentQuestionIndex = 0;
    let timeLeft = 60; // Initial time set for the quiz
    let timerInterval; // Variable to store the timer interval ID
  
    // Access the questions directly from the window object
    const questionsData = window.questions;
  
    // Function to start the quiz
    function startQuiz() {
      // Hide the start screen and show the questions section
      document.getElementById("start-screen").classList.add("hide");
      questionsContainer.classList.remove("hide");
  
      // Start the timer
      startTimer();
  
      // Display the first question
      displayQuestion();
    }
  
    // Function to display a question
    function displayQuestion() {
      // Get the current question data from the array
      const currentQuestion = questionsData[currentQuestionIndex];
  
      // Display the title of the current question
      document.getElementById("question-title").textContent = currentQuestion.question;
  
      // Display answer choices as buttons
      choicesContainer.innerHTML = "";
      currentQuestion.choices.forEach((choice, index) => {
        // Create a button for each answer choice
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
  
        // Attach an event listener to the button to check the answer when clicked
        choiceButton.addEventListener("click", () => checkAnswer(index));
  
        // Append the button to the choices container
        choicesContainer.appendChild(choiceButton);
      });
    }
  
    // Function to check the selected answer
    function checkAnswer(selectedIndex) {
      // Get the current question data
      const currentQuestion = questionsData[currentQuestionIndex];
  
      // Check if the selected answer index matches the correct answer index
      if (selectedIndex === currentQuestion.correctAnswer) {
        // Logic for a correct answer can be added here (e.g., handling scores)
      } else {
        // Incorrect answer: Deduct time for incorrect answer
        timeLeft -= 10;
  
        // Ensure the score doesn't go below 0
        timeLeft = Math.max(timeLeft, 0);
      }
  
      // Log the time left after each question
      console.log("Time Left after Question", currentQuestionIndex + 1, ":", timeLeft);
  
      // Move to the next question or end the game if all questions are answered
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
  
      // Log the final time
      console.log("Final Time:", timeLeft);
  
      // Display the end screen
      const endScreen = document.getElementById("end-screen");
      endScreen.classList.remove("hide");
  
      // Display the final score
      const finalScoreElement = document.getElementById("final-score");
      finalScoreElement.textContent = Math.max(timeLeft, 0);
  
      // Event listener for the submit button to save initials and redirect to highscores.html
      const submitButton = document.getElementById("submitInitials");
      submitButton.addEventListener("click", function () {
        // Retrieve user initials from the input field
        const userInitials = document.getElementById("initialsInput").value.trim();
  
        // Log user initials and final score
        console.log("User Initials:", userInitials);
        console.log("Final Score:", Math.max(timeLeft, 0));
  
        // Create a high score entry
        const scoreEntry = {
          initials: userInitials.substring(0, 3), // Save only the first three initials
          score: Math.max(timeLeft, 0), // Use the actual time left as the score
        };
  
        // Get existing high scores from local storage or initialize an empty array
        const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  
        // Add the new score entry to the array
        highscores.push(scoreEntry);
  
        // Save the updated high scores to local storage
        localStorage.setItem("highscores", JSON.stringify(highscores));
  
        // Redirect to highscores.html
        window.location.href = "highscores.html";
      });
    }
  
    // Function to start the timer
    function startTimer() {
      // Set up a timer interval to decrement time every second
      timerInterval = setInterval(function () {
        timeLeft--;
  
        // Update the timer display only if time is greater than or equal to 0
        if (timeLeft >= 0) {
          timerElement.textContent = timeLeft;
        } else {
          // If time runs out, end the game
          endGame();
        }
      }, 1000);
    }
  
    // Event listener for the start button to begin the quiz
    startButton.addEventListener("click", startQuiz);
  });
  