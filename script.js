//your JS code here.


// Do not change code below this line
// script.js

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Load saved progress from sessionStorage or initialize empty array
let userAnswers = [];
const savedProgress = sessionStorage.getItem("progress");
if (savedProgress) {
  try {
    userAnswers = JSON.parse(savedProgress);
  } catch {
    userAnswers = [];
  }
} 
if (!Array.isArray(userAnswers) || userAnswers.length !== questions.length) {
  userAnswers = new Array(questions.length).fill(null);
}

// Load saved score from localStorage and display if exists
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}

// Render questions and choices
function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear previous content

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionDiv = document.createElement("div");
    questionDiv.style.marginBottom = "1em";

    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionText.style.fontWeight = "bold";
    questionDiv.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      const label = document.createElement("label");
      label.style.display = "block";
      label.style.cursor = "pointer";

      const choiceInput = document.createElement("input");
      choiceInput.type = "radio";
      choiceInput.name = `question-${i}`;
      choiceInput.value = choice;
      choiceInput.style.marginRight = "0.5em";

      // Check if this choice was previously selected
      if (userAnswers[i] === choice) {
        choiceInput.checked = true;
      }

      // When user selects an option, update userAnswers and save to sessionStorage
      choiceInput.addEventListener("change", () => {
        userAnswers[i] = choiceInput.value;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      label.appendChild(choiceInput);
      label.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(label);
    }

    questionsElement.appendChild(questionDiv);
  }
}

renderQuestions();

submitBtn.addEventListener("click", () => {
  // Calculate score based on userAnswers
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  // Display score
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;

  // Save score to localStorage
  localStorage.setItem("score", score);
});
