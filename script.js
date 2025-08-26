const questions = [
  {
    question: "What is the capital of Pakistan?",
    options: ["Karachi", "Islamabad", "Lahore", "Peshawar"],
    answer: "Islamabad"
  },
  {
    question: "Which language runs in the browser?",
    options: ["Python", "C++", "JavaScript", "Java"],
    answer: "JavaScript"
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "HighText Machine Language",
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "CSS is used for?",
    options: ["Styling", "Database", "Programming", "Networking"],
    answer: "Styling"
  },
  {
    question: "Which company created JavaScript?",
    options: ["Google", "Microsoft", "Netscape", "Apple"],
    answer: "Netscape"
  }
];

let currentIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const quizBox = document.getElementById("quiz-box");
const scoreEl = document.getElementById("score");

function startQuiz() {
  currentIndex = 0;
  score = 0;
  quizBox.classList.remove("hidden");
  resultBox.classList.add("hidden");
  showQuestion();
}

function showQuestion() {
  let currentQuestion = questions[currentIndex];
  questionEl.textContent = currentQuestion.question;
  optionsEl.innerHTML = "";

  currentQuestion.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option");
    btn.onclick = () => selectAnswer(btn, currentQuestion.answer);
    optionsEl.appendChild(btn);
  });

  nextBtn.style.display = "none";
}

function selectAnswer(selectedBtn, correctAnswer) {
  const allOptions = document.querySelectorAll(".option");
  allOptions.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct");
    } else if (btn === selectedBtn) {
      btn.classList.add("incorrect");
    }
  });

  if (selectedBtn.textContent === correctAnswer) {
    score++;
  }

  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreEl.textContent = `You scored ${score} out of ${questions.length}`;
}

