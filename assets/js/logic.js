// Wait for the HTML document to fully load before executing JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Get references to various elements using their IDs
  const startButton = document.getElementById("start");
  const questionsContainer = document.getElementById("questions");
  const choicesContainer = document.getElementById("choices");
  const feedbackContainer = document.getElementById("feedback");
  const timerElement = document.getElementById("time");

  // Track the current question index, remaining time, and timer interval
  let currentQuestionIndex = 0;
  let timeLeft = 60;
  let timerInterval;

  // Track the correctness of the previous answer and if the first question is answered
  let previousAnswerCorrect = true;
  let firstQuestionAnswered = false;

  // Access the questions data from the window object
  const questionsData = window.questions;

  // Function to start the quiz
  function startQuiz() {
    // Hide the start screen and display the questions
    document.getElementById("start-screen").classList.add("hide");
    questionsContainer.classList.remove("hide");

    // Start the timer and display the first question
    startTimer();
    displayQuestion();
  }

  // Function to display a question
  function displayQuestion() {
    if (currentQuestionIndex < questionsData.length) {
      const currentQuestion = questionsData[currentQuestionIndex];

      // Display the question title
      document.getElementById("question-title").textContent = currentQuestion.question;

      // Display answer choices
      choicesContainer.innerHTML = "";
      currentQuestion.choices.forEach((choice, index) => {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        choiceButton.addEventListener("click", () => checkAnswer(index));
        choicesContainer.appendChild(choiceButton);
      });

      // Display feedback based on the previous answer
      displayFeedback();
    } else {
      // Check if the time is up before displaying "All Done"
      if (timeLeft <= 0) {
        const endScreen = document.getElementById("end-screen");
        endScreen.classList.remove("hide");

        const finalScoreElement = document.getElementById("final-score");
        finalScoreElement.textContent = "Time's up!";
      } else {
        // End the game and display the final score
        endGame();
      }
    }
  }

  // Function to check the selected answer
  function checkAnswer(selectedIndex) {
    const currentQuestion = questionsData[currentQuestionIndex];

    // Check if the selected answer is correct
    if (selectedIndex === currentQuestion.correctAnswer) {
      previousAnswerCorrect = true;
    } else {
      // Incorrect answer: Subtract time and update timeLeft
      previousAnswerCorrect = false;
      timeLeft -= 10;
      timeLeft = Math.max(timeLeft, 0);
    }

    // Log the time left after each question
    console.log("Time Left after question", currentQuestionIndex + 1, ":", timeLeft);

    // Set firstQuestionAnswered to true after the first question is answered
    if (!firstQuestionAnswered) {
      firstQuestionAnswered = true;
    }

    // Move to the next question or end the game
    currentQuestionIndex++;
    displayQuestion();
  }

  // Function to end the game
  function endGame() {
    clearInterval(timerInterval);

    // Display the end-screen
    const endScreen = document.getElementById("end-screen");
    endScreen.classList.remove("hide");

    // Display the final score
    const finalScoreElement = document.getElementById("final-score");
    finalScoreElement.textContent = Math.max(timeLeft, 0);

    // Event listener for the submit button
    const submitButton = document.getElementById("submitInitials");
    submitButton.addEventListener("click", function () {
      // Retrieve user initials from the input field
      const userInitials = document.getElementById("initialsInput").value.trim();

      // Log the user initials and final score
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
    timerInterval = setInterval(function () {
      timeLeft--;

      // Update the displayed timer
      if (timeLeft >= 0) {
        timerElement.textContent = timeLeft;
      } else {
        // End the game if time runs out
        endGame();
      }
    }, 1000);
  }

  // Function to display feedback
  function displayFeedback() {
    // Check if the user has answered at least one question
    if (firstQuestionAnswered) {
      // Create an h2 element for feedback
      const feedbackElement = document.createElement("h2");

      // Display different feedback based on the correctness of the previous answer
      if (previousAnswerCorrect) {
        feedbackElement.textContent = "Correct Answer!";
        feedbackElement.style.color = "green";
      } else {
        feedbackElement.textContent = "Wrong Answer!";
        feedbackElement.style.color = "red";
      }

      // Append the feedback element to the feedback container
      feedbackContainer.innerHTML = ""; // Clear previous content
      feedbackContainer.appendChild(feedbackElement);

      // Remove the hide class to make the feedback visible
      feedbackContainer.classList.remove("hide");
    }
  }

  // Event listener for the start button
  startButton.addEventListener("click", startQuiz);
});