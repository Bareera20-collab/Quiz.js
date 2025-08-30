// ✅ Default Questions
const defaultQuestions = [
  { question: "What is the capital of Pakistan?", options: ["Karachi", "Islamabad", "Lahore", "Peshawar"], answer: "Islamabad" },
  { question: "Which language runs in the browser?", options: ["Python", "C++", "JavaScript", "Java"], answer: "JavaScript" },
  { question: "What does HTML stand for?", options: ["Hyper Text Markup Language","HighText Machine Language","Hyperlinks and Text Markup Language","Home Tool Markup Language"], answer: "Hyper Text Markup Language" },
  { question: "CSS is used for?", options: ["Styling","Database","Programming","Networking"], answer: "Styling" },
  { question: "Which company created JavaScript?", options: ["Google","Microsoft","Netscape","Apple"], answer: "Netscape" }
];

// ✅ Add Question Page
const addForm = document.getElementById("add-form");
if (addForm) {
  addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = document.getElementById("q-text").value;
    const opt1 = document.getElementById("opt1").value;
    const opt2 = document.getElementById("opt2").value;
    const opt3 = document.getElementById("opt3").value;
    const opt4 = document.getElementById("opt4").value;
    const ans = document.getElementById("ans").value;

    const newQ = { question: q, options: [opt1, opt2, opt3, opt4], answer: ans };
    let saved = JSON.parse(localStorage.getItem("customQuestions")) || [];
    saved.push(newQ);
    localStorage.setItem("customQuestions", JSON.stringify(saved));

    alert("Question Saved!");
    addForm.reset();
  });
}


// ✅ Quiz Functions
let currentIndex, score, questions;

function startNormalQuiz() {
  questions = defaultQuestions;
  startQuiz();
}

function startCustomQuiz() {
  let saved = JSON.parse(localStorage.getItem("customQuestions")) || [];
  if (saved.length === 0) {
    alert("No custom questions found! Add some first.");
    location.href = "add.html";
    return;
  }
  questions = saved;
  startQuiz();
}

function startQuiz() {
  currentIndex = 0;
  score = 0;
  document.getElementById("quiz-box").classList.remove("hidden");
  document.getElementById("result-box").classList.add("hidden");
  showQuestion();
}

function showQuestion() {
  let currentQuestion = questions[currentIndex];
  document.getElementById("question").textContent = currentQuestion.question;
  const optionsEl = document.getElementById("options");
  optionsEl.innerHTML = "";

  currentQuestion.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.classList.add("option");
    btn.onclick = () => selectAnswer(btn, currentQuestion.answer);
    optionsEl.appendChild(btn);
  });

  document.getElementById("next-btn").style.display = "none";
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

  document.getElementById("next-btn").style.display = "inline-block";
}

const nextBtn = document.getElementById("next-btn");
if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });
}

function showResult() {
  document.getElementById("quiz-box").classList.add("hidden");
  document.getElementById("result-box").classList.remove("hidden");
  document.getElementById("score").textContent = `You scored ${score} out of ${questions.length}`;
}
