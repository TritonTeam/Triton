const questions = [
    {
        question: "What is Bitcoin?",
        choices: ["A cryptocurrency", "A programming language", "A type of computer"],
        correctChoice: 0
    },
    {
        question: "Which blockchain platform uses the Ether cryptocurrency?",
        choices: ["Bitcoin", "Ethereum", "Ripple"],
        correctChoice: 1
    },
    {
        question: "What does the term 'HODL' mean in the context of cryptocurrencies?",
        choices: ["Hold On for Dear Life", "Highly Optimistic Decentralized Ledger", "Hyped Online Digital Lifestyle"],
        correctChoice: 0
    },
    {
        question: "What is the process by which new bitcoins are created and added to the circulation?",
        choices: ["Mining", "Minting", "Printing"],
        correctChoice: 0
    },
];

let currentQuestion = 0;
let score = 0;

const quizContainer = document.querySelector(".quiz-container");
const questionNumberElement = document.getElementById("question-number");
const questionTextElement = document.getElementById("question-text");
const choicesElement = document.getElementById("choices");
const scoreElement = document.getElementById("score");

function showQuestion(questionIndex) {
    const question = questions[questionIndex];
    questionNumberElement.textContent = `Question ${questionIndex + 1}`;
    questionTextElement.textContent = question.question;

    choicesElement.innerHTML = "";
    for (let i = 0; i < question.choices.length; i++) {
        const choiceButton = document.createElement("button");
        choiceButton.className = "choice";
        choiceButton.textContent = question.choices[i];
        choiceButton.onclick = () => checkAnswer(i);
        choicesElement.appendChild(choiceButton);
    }

    // Reset container opacity and background color
    quizContainer.style.opacity = 1;
    quizContainer.style.backgroundColor = "#f9f9f9";
}

function showEndMessage() {
    quizContainer.innerHTML = `
        <p>You've come to the end of the limited version.</p>
        <p>If you want to try the premium version, <a href="premium.html">click here</a></p>
    `;
    quizContainer.style.opacity = 1;
    quizContainer.style.backgroundColor = "#f9f9f9";
}

function checkAnswer(choiceIndex) {
    const question = questions[currentQuestion];
    const choiceButtons = choicesElement.querySelectorAll(".choice");
    choiceButtons.forEach(button => {
        button.disabled = true;
    });

    if (choiceIndex === question.correctChoice) {
        score++;
        scoreElement.textContent = `Score: ${score}`;
        choiceButtons[choiceIndex].style.backgroundColor = "green";
    } else {
        choiceButtons[choiceIndex].style.backgroundColor = "red";
        choiceButtons[question.correctChoice].style.backgroundColor = "green";
    }

    // Apply fading effect
    setTimeout(() => {
        quizContainer.style.opacity = 0.7;
        quizContainer.style.backgroundColor = "rgba(249, 249, 249, 0.7)";

        setTimeout(() => {
            currentQuestion++;
            if (currentQuestion < questions.length) {
                showQuestion(currentQuestion);
            } else {
                // Quiz is finished
                showEndMessage();
            }
        }, 1000); // Delay before moving to the next question
    }, 50); // Delay before applying fading effect
}

// Start the quiz
showQuestion(currentQuestion);
