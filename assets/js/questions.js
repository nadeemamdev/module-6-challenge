// Array containing quiz questions and their respective choices
const questions = [
    {
      question: "What is the result of 2 + 2?",
      choices: ["3", "4", "5", "6"],
      correctAnswer: 1, // Index of the correct answer in the choices array
    },
    {
      question: "Which keyword is used to declare a variable in JavaScript?",
      choices: ["var", "let", "const", "variable"],
      correctAnswer: 2, // Index of the correct answer in the choices array
    },
    {
      question: "What does DOM stand for?",
      choices: ["Document Object Model", "Data Object Model", "Document Oriented Model", "Domino"],
      correctAnswer: 0, // Index of the correct answer in the choices array
    },
    {
      question: "How do you comment in JavaScript?",
      choices: ["//", "/* */", "#", "--"],
      correctAnswer: 1, // Index of the correct answer in the choices array
    },
    {
      question: "What is the purpose of the `typeof` operator in JavaScript?",
      choices: ["To check the type of a variable", "To create a new variable", "To loop through an array", "To define a function"],
      correctAnswer: 0, // Index of the correct answer in the choices array
    },
  ];
  
  // Export the questions array to make it accessible in other JavaScript files
  window.questions = questions;
  