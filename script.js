const quizData = [
    {
        question: "Which language runs in a web browser?",
        a: "Java", b: "C", c: "Python", d: "JavaScript",
        correct: "d",
    },
    {
        question: "What does CSS stand for?",
        a: "Central Style Sheets", b: "Cascading Style Sheets", c: "Cascading Simple Sheets", d: "Cars SUVs Sailboats",
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language", b: "Hypertext Markdown Language", c: "Hyperloop Machine Language", d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996", b: "1995", c: "1994", d: "none of the above",
        correct: "b",
    }
];

// 1. Grab all the HTML elements we need to manipulate
const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer'); // Grabs all radio buttons
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');

// 2. State Variables (Memory)
let currentQuiz = 0;
let score = 0;

// Call the function for the first time to show the first question
loadQuiz();

// 3. TASK 1: Load Question onto screen
function loadQuiz() {
    deselectAnswers(); // Clear any previous selections

    const currentQuizData = quizData[currentQuiz];

    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

// Helper: Uncheck all radio buttons before loading new question
function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false);
}

// 4. TASK 2: Find out which option the user selected
function getSelected() {
    let answer;
    // Loop through all radio buttons to find the one that is checked
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id; // Returns 'a', 'b', 'c', or 'd'
        }
    });
    return answer;
}

// 5. TASK 3: Submit Button Logic
submitBtn.addEventListener('click', () => {
    // Get the selected answer
    const answer = getSelected();

    // Only proceed if the user actually selected something
    if (answer) {
        // If correct, increase score
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }

        // Move to the next question
        currentQuiz++;

        // Check if we have more questions left
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            // No questions left? Show the final result HTML!
            quiz.innerHTML = `
                <div style="padding: 3rem 2rem; text-align: center;">
                    <h2>You answered ${score}/${quizData.length} questions correctly</h2>
                </div>
                <button onclick="location.reload()">Reload</button>
            `;
        }
    }
});