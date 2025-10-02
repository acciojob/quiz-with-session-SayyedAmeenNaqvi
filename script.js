// your JS code here.

/**
 * Retrieves the user's progress from session storage.
 * @returns {Object} An object mapping question index to selected answer, or an empty object.
 */
function getProgress() {
	return JSON.parse(sessionStorage.getItem("progress")) || {};
}

/**
 * Saves the user's progress object to session storage.
 * @param {Object} obj - The progress object to save.
 */
function saveProgress(obj) {
	sessionStorage.setItem("progress", JSON.stringify(obj));
}

const questionsElement = document.getElementById("questions");
// Load progress from Session Storage on page load
const userAnswers = getProgress(); 

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

// Display the quiz questions and choices, and attach event listeners for progress saving
function renderQuestions() {
	for (let i = 0; i < questions.length; i++) {
		const question = questions[i];
		const questionElement = document.createElement("div");
        questionElement.style.marginBottom = "15px"; // Optional styling for readability
		
        const questionHeader = document.createElement("p");
        questionHeader.style.fontWeight = "bold"; // Optional styling for readability
        questionHeader.textContent = `${i + 1}. ${question.question}`;
		questionElement.appendChild(questionHeader);

		for (let j = 0; j < question.choices.length; j++) {
			const choice = question.choices[j];
			
            const label = document.createElement("label");
            label.style.marginRight = "10px"; // Optional styling for readability
            
			const choiceElement = document.createElement("input");
			choiceElement.setAttribute("type", "radio");
			choiceElement.setAttribute("name", `question-${i}`);
			choiceElement.setAttribute("value", choice);

            // Event listener to save progress to Session Storage on every answer change
			choiceElement.addEventListener("change", (event) => {
				userAnswers[i] = event.target.value; // Save the selected value
				saveProgress(userAnswers);
			});

			// Check if this answer was previously selected (for page refresh/progress retention)
			if (userAnswers[i] === choice) {
				choiceElement.checked = true;
			}

            const choiceText = document.createTextNode(choice);
            label.appendChild(choiceElement);
            label.appendChild(choiceText);
            
			questionElement.appendChild(label);
		}

		questionsElement.appendChild(questionElement);
	}
}

renderQuestions();

const scoreDisplay = document.getElementById("score");
const submitButton = document.getElementById("submit");

// Event listener for quiz submission
submitButton.addEventListener("click", () => {
	let count = 0;
    
    // Calculate the score based on the current userAnswers object
	for (let i = 0; i < questions.length; i++) {
        // userAnswers[i] might be undefined if a question was skipped.
        // We only check for a correct answer.
		if (userAnswers[i] === questions[i].answer) {
			count++;
		}
	}

	// Store the final score in Local Storage
	localStorage.setItem("score", count);
    
    // Display the score
	scoreDisplay.textContent = `Your score is ${count} out of ${questions.length}.`;
    

    sessionStorage.removeItem("progress"); 
});

// Check Local Storage for a previously saved score and display it
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
	scoreDisplay.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}

// Note: The total number of questions is automatically handled by using questions.length, which is 5.