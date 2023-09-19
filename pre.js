const questions = [
    {
        question: "What is the underlying technology behind cryptocurrencies?",
        choices: ["Blockchain", "Artificial Intelligence", "Cloud Computing"],
        correctChoice: 0
    },
    {
        question: "What is the term for the process of verifying and recording transactions on a blockchain?",
        choices: ["Mining", "Trading", "Coding"],
        correctChoice: 0
    },
    {
        question: "Which cryptocurrency is often referred to as 'digital gold'?",
        choices: ["Ethereum", "Litecoin", "Bitcoin"],
        correctChoice: 2
    },
    {
        question: "What is the primary purpose of a cryptocurrency wallet?",
        choices: ["Sending Emails", "Storing Cryptocurrency", "Playing Games"],
        correctChoice: 1
    },
    {
        question: "What is the first cryptocurrency ever created?",
        choices: ["Ethereum", "Ripple", "Bitcoin"],
        correctChoice: 2
    },
    {
    question: "What is the primary function of hackerearth.com's 'HackerRank' platform?",
    choices: ["Cryptocurrency trading", "Competitive coding challenges", "Blockchain development tutorials"],
    correctChoice: 1
    },
    
];

let currentQuestion = 0;
let score = 0;
let timer;

const quizContainer = document.querySelector(".quiz-container");
const questionNumberElement = document.getElementById("question-number");
const questionTextElement = document.getElementById("question-text");
const choicesElement = document.getElementById("choices");
const scoreElement = document.getElementById("score");

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(questions);

function showQuestion(questionIndex) {  
    clearInterval(timer);
    const question = questions[questionIndex];
    questionNumberElement.textContent = `Question ${questionIndex + 1}`;
    questionTextElement.textContent = question.question;

    let timeLeft = 20;
    
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

    

    // Display and update the timer
    const timerElement = document.getElementById('timer');
    timerElement.textContent = `Time Left: ${timeLeft}s`;

    if (questionIndex === 0) {
        clearInterval(timer); // Stop the timer when time runs out
        timeLeft = 9999;
        timerElement.style.display = "none";
    }   else {
        timerElement.style.display = "block"; // Show the timer for other questions
    }



    timer = setInterval(() => {
        timeLeft--;

        // Update the timer text
        timerElement.textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft === 0) {
            clearInterval(timer); // Stop the timer when time runs out
            currentQuestion++;
            if (currentQuestion < questions.length) {
                showQuestion(currentQuestion);
            } else {
                // Quiz is finished
                showEndMessage();
            }
        }
    }, 1000); // Update the timer every second
}



function showEndMessage() {
    quizContainer.innerHTML = `
        <p>Well Done Soldier!</p>
        <p>Your score is ${score}/36</p>
        <p id="countdown"></p>
    `;
    quizContainer.style.opacity = 1;
    quizContainer.style.backgroundColor = "#f9f9f9";

    const targetDates = [
        new Date("2023-10-08"),
        new Date("2023-10-29"),
        new Date("2023-11-19"),
        new Date("2023-12-10"),
        new Date("2023-12-31")
    ];

    function updateCountdown() {
        const now = new Date();
        let nextDate = targetDates.find(date => date > now);

        if (!nextDate) {
            // If all target dates have passed, display a message
            document.getElementById("countdown").textContent = "The season has ended.";
        } else {
            // Calculate the days until the next target date
            const daysRemaining = Math.ceil((nextDate - now) / (1000 * 60 * 60 * 24));
            document.getElementById("countdown").textContent = `${daysRemaining} days until the end of the first season`;
        }
    }

    // Update the countdown every second
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Initial update
    updateCountdown();

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
            if (currentQuestion < 10) {
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


