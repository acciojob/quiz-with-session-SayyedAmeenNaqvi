//your JS code here.


// Do not change code below this line
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
    choices: ["Earth", "Jupiter", "Mars", "Venus"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// --- Quiz Logic Starts Here ---

const questionsElement = document.getElementById("questions");
const scoreElement = document.getElementById("score");
const submitButton = document.getElementById("submit");

// 1. Load user progress from session storage, defaulting to an empty array
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

/**
 * Saves the selected answer to userAnswers array and updates session storage.
 */
function saveProgress(event) {
  const input = event.target;
  // Get the question index from the custom attribute
  const questionIndex = parseInt(input.getAttribute('data-q-index')); 
  const selectedValue = input.value;
  
  // Update the answer array
  userAnswers[questionIndex] = selectedValue;
  
  // Save progress to session storage
  sessionStorage.setItem("progress", JSON.stringify(userAnswers));
}

/**
 * Calculates the score, displays it, and saves it to local storage.
 */
function calculateAndDisplayScore() {
  let score = 0;
  const maxScore = questions.length;
  
  // Calculate score based on the current userAnswers array
  for (let i = 0; i < maxScore; i++) {
    // Edge case handled: If userAnswers[i] is undefined (not answered), it won't match, so score isn't affected.
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  const scoreText = `Your score is ${score} out of ${maxScore}.`;
  
  // Display and store the score
  scoreElement.textContent = scoreText;
  localStorage.setItem("score", scoreText);

  // Disable the form after submission
  submitButton.disabled = true;
  document.querySelectorAll('input[type="radio"]').forEach(input => {
      input.disabled = true;
  });
}

/**
 * Checks local storage for a previously submitted score and handles quiz state.
 */
function checkAndHandleQuizState() {
    const lastScore = localStorage.getItem("score");
    if (lastScore) {
        // If a score exists in Local Storage, display it and disable the quiz
        scoreElement.textContent = `Last submitted score: ${lastScore}`;
        submitButton.disabled = true;
        // The radio buttons will be disabled in renderQuestions if this is true
        return true; 
    }
    return false;
}

/**
 * Displays the quiz questions, checking for saved progress and current score state.
 */
function renderQuestions() {
  questionsElement.innerHTML = '';
  const quizIsCompleted = checkAndHandleQuizState();

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    
    // Question Text
    const questionText = document.createElement('p');
    questionText.textContent = `Q${i+1}: ${question.question}`;
    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      
      const labelElement = document.createElement("label");
      
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      choiceElement.setAttribute("data-q-index", i); // Used by saveProgress

      // 2. Retain selection from session storage
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }
      
      // If quiz is completed, disable the inputs
      if (quizIsCompleted) {
        choiceElement.disabled = true;
      }
      
      // Add event listener for progress saving
      choiceElement.addEventListener('change', saveProgress);

      const choiceText = document.createTextNode(choice);
      
      labelElement.appendChild(choiceElement);
      labelElement.appendChild(choiceText);
      labelElement.appendChild(document.createElement("br")); 
      
      questionElement.appendChild(labelElement);
    }
    questionsElement.appendChild(questionElement);
  }
}

// Attach event listener to the submit button
submitButton.addEventListener('click', calculateAndDisplayScore);


renderQuestions();