const questions = [
    {
        question: "What is the name of the longest river in the world?",
        answers: [
            { text: "Nile", correct: true },
            { text: "Amazon", correct: false },
            { text: "Volga", correct: false },
            { text: "Missuri", correct: false },
        ]
    },
    {
        question: "What is the name of the largest ocean in the world?",
        answers: [
            { text: "The Atlantic Ocean", correct: false },
            { text: "The Indian Ocean", correct: false },
            { text: "The Pacific Ocean", correct: true },
            { text: "The Arctic Ocean", correct: false },
        ]
    },
    {
        question: "What is the name of the smallest country in the world?",
        answers: [
            { text: "San-Marino", correct: false },
            { text: "The Vatican City", correct: true },
            { text: "Monaco", correct: false },
            { text: "Luxemburg", correct: false },
        ]
    },
    {
        question: "What planet is closest to Earth?",
        answers: [
            { text: "Saturn", correct: false },
            { text: "Mars", correct: false },
            { text: "Mercuri", correct: false },
            { text: "Venus", correct: true },
        ]
    },
    {
        question: "What country formerly ruled Iceland?",
        answers: [
            { text: "United Kingdom", correct: false },
            { text: "Netherland", correct: false },
            { text: "Denmark", correct: true },
            { text: "Norway", correct: false },
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '.' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++
    } else {
        selectedBtn.classList.add('incorrect')
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add('correct')
        }
        button.disabled = true
    })
    nextButton.style.display = "block"
}
function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = 'block';
}


function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion()
    } else {
        showScore()
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton()
    } else {
        startQuiz()
    }
})

startQuiz();
