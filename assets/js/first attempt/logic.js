// Import the questions array
var questions = window.questions;

// Declare variables
var timer;
var timeRemaining;
var currentQuestionIndex;
var score;

function startQuiz() {
    // Initialize variables and start the timer
    timeRemaining = 60; // Adjust as needed
    currentQuestionIndex = 0;
    score = 0;
    startTimer();
    
    // Display the first question and then increment currentQuestionIndex
    displayQuestion();
    currentQuestionIndex++;

    // Log a message to the console to check if the function is called
    console.log("Quiz started!");
}

// Add this event listener for the "Start Quiz" button
document.getElementById("start").addEventListener("click", startQuiz);

function startTimer() {
    // Implement the timer logic
    timer = setInterval(function () {
        timeRemaining--;
        document.getElementById("time").textContent = timeRemaining;
        if (timeRemaining <= 0) {
            endQuiz();
        }
    }, 1000);
}

function displayQuestion() {
    console.log("Displaying question:", currentQuestionIndex);

    // Check if there are more questions
    if (currentQuestionIndex < questions.length) {
        var question = questions[currentQuestionIndex];

        // Update question title
        document.getElementById("question-title").textContent = question.title;

        // Clear previous choices
        var choicesContainer = document.getElementById("choices");
        choicesContainer.innerHTML = "";

        // Create buttons for each choice
        question.choices.forEach(function (choice) {
            var button = document.createElement("button");
            button.textContent = choice;
            button.addEventListener("click", function () {
                checkAnswer(choice);
            });
            choicesContainer.appendChild(button);
        });
    } else {
        // No more questions, end the quiz
        endQuiz();
    }
}


function checkAnswer(answer) {
    // Check if the answer is correct, update score and move to the next question
    var question = questions[currentQuestionIndex];
    if (answer === question.correctAnswer) {
        score += 10; // Adjust as needed
    } else {
        timeRemaining -= 10; // Penalize for incorrect answer
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    // End the quiz, display the score, and allow the user to save initials
    clearInterval(timer);
    document.getElementById("final-score").textContent = score;
    document.getElementById("end-screen").classList.remove("hide");
}

// Add event listener for the start button
document.getElementById("start").addEventListener("click", startQuiz);

// Add event listener for the submit button
document.getElementById("submit").addEventListener("click", function () {
    var initials = document.getElementById("initials").value;
    // Save initials and score logic (to be implemented)
});