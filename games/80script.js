// DOM elements
const startBtn = document.getElementById("startBtn");
const questionContainer = document.getElementById("questionContainer");
const timerDisplay = document.getElementById("timer");
const restartBtn = document.querySelector('button[onclick="restartGame()"]');

// Game variables
let score = 0;
let questionIndex = 0;
let timer;

// Questions array
const questions = [{
    equation: "12 / (4/5)  ?", answers: ["30", "15", "9 3/5", "24"],
    correctAnswer: "15"
},
    // Add more questions here
];

// Event listener for start button
startBtn.addEventListener("click", startGame);

// Function to start the game
function startGame() {
    startBtn.disabled = true;
    timerDisplay.style.display = "block";
    questionContainer.style.display = "block";
    answersContainer.style.display = "block";
    restartBtn.style.display = "block";
    displayNextQuestion();
    startTimer();
}

const answersContainer = document.getElementById("answersContainer");

function displayNextQuestion() {
    if (questionIndex >= questions.length) {
        // All questions answered
        endGame();
        return;
    }

    const question = questions[questionIndex];

    // Generate HTML for question
    const questionHTML = `
      <h2>${question.equation}</h2>
    `;

    const answersHTML = question.answers
        .map(
            (answer, index) => {
                const answerClass = index % 4 === 0 ? "answer first" : "answer";
                return `<div class="${answerClass}" onclick="handleAnswerClick(${index})">${answer}</div>`;
            }
        )
        .join("");

    questionContainer.innerHTML = questionHTML;
    answersContainer.innerHTML = answersHTML;
}



// Function to handle user answer selection
function handleAnswerClick(answerIndex) {
    const question = questions[questionIndex];

    if (question.answers[answerIndex] === question.correctAnswer) {
        score++;
    } else {
        score -= 2;
        if (score < 0) {
            score = 0;
        }
    }

    questionIndex++;
    displayNextQuestion();
}

// Function to start the timer
function startTimer() {
    let timeRemaining = 8 * 60; // 8 minutes in seconds

    updateTimerDisplay(timeRemaining);

    // Clear the existing timer if it exists
    if (timer) {
        clearInterval(timer);
    }

    timer = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            updateTimerDisplay(timeRemaining);
        } else {
            endGame();
        }
    }, 1000);
}


// Function to update the timer display
function updateTimerDisplay(timeRemaining) {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Function to end the game
function endGame() {
    clearInterval(timer);
    // Display the final score or any other game over logic
    questionContainer.innerHTML = `<h2>Game Over</h2><p>Final Score: ${score}</p>`;
    startBtn.disabled = false;
    score = 0;
    questionIndex = 0;
}

// Function to restart the game
function restartGame() {
    clearInterval(timer);
    score = 0;
    questionIndex = 0;
    startBtn.disabled = false;
    questionContainer.innerHTML = "";
    answersContainer.innerHTML = "";
    timerDisplay.textContent = "8:00";
    timerDisplay.style.display = "none";
    questionContainer.style.display = "none";
    answersContainer.style.display = "none";
    restartBtn.style.display = "none";
}