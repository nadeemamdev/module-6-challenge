// questions.js

var questions = [
    {
        title: "What does HTML stand for?",
        choices: ["Hyper Text Markup Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language", "Hyper Transfer Markup Language"],
        correctAnswer: "Hyper Text Markup Language"
    },
    {
        title: "What does CSS stand for?",
        choices: ["Counter Strike: Source", "Computer Style Sheet", "Creative Style System", "Cascading Style Sheet"],
        correctAnswer: "Cascading Style Sheet"
    },
    {
        title: "What HTML tag is used to create a hyperlink?",
        choices: ["<link>", "<a>", "<href>", "<url>"],
        correctAnswer: "<a>"
    },
    {
        title: "Which of the following is NOT a valid JavaScript variable name?",
        choices: ["myVar", "_myVar", "123Var", "$myVar"],
        correctAnswer: "123Var"
    },
    {
        title: "What is the purpose of the 'alt' attribute in an HTML image tag?",
        choices: ["Align the image", "Alternative text for browsers that cannot display the image", "Adjust the image size", "Apply a filter to the image"],
        correctAnswer: "Alternative text for browsers that cannot display the image"
    },
    {
        title: "What is the correct way to comment out a single line of code in JavaScript?",
        choices: ["/* This is a comment */", "// This is a comment", "# This is a comment", "-- This is a comment"],
        correctAnswer: "// This is a comment"
    },
    // Add more questions as needed
];

// Define a global variable to store questions
window.questions = questions;
