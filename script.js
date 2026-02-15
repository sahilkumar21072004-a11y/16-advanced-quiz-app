/* ================= QUESTIONS WITH DIFFICULTY ================= */
const questions = [
  {
    q: "What is the capital of India?",
    options: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
    answer: "Delhi",
    level: "easy"
  },
  {
    q: "Which language runs in browser?",
    options: ["Python", "Java", "C++", "JavaScript"],
    answer: "JavaScript",
    level: "easy"
  },
  {
    q: "HTML stands for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Tool Multi Language",
      "None"
    ],
    answer: "Hyper Text Markup Language",
    level: "medium"
  },
  {
    q: "Which company developed JavaScript?",
    options: ["Microsoft", "Netscape", "Google", "Oracle"],
    answer: "Netscape",
    level: "medium"
  },
  {
    q: "Which method prints in console?",
    options: ["console.print()", "print()", "console.log()", "log()"],
    answer: "console.log()",
    level: "hard"
  }
];

/* ================= RANDOM ORDER ================= */
questions.sort(() => Math.random() - 0.5);

/* ================= VARIABLES ================= */
let index = 0;
let score = 0;
let time = 10;
let timerInterval;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("timer");
const progressEl = document.getElementById("progress");

/* ================= TIMER BASED ON DIFFICULTY ================= */
function getTimeByLevel(level) {
  if (level === "easy") return 15;
  if (level === "medium") return 10;
  return 7; // hard
}

/* ================= LOAD QUESTION ================= */
function loadQuestion() {
  clearInterval(timerInterval);

  const current = questions[index];

  time = getTimeByLevel(current.level);
  timerEl.textContent = `Time: ${time}s`;

  questionEl.textContent = current.q;
  optionsEl.innerHTML = "";

  current.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;

    btn.onclick = () => selectAnswer(opt);

    optionsEl.appendChild(btn);
  });

  startTimer();
  updateProgress();
}

/* ================= START TIMER ================= */
function startTimer() {
  timerInterval = setInterval(() => {
    time--;
    timerEl.textContent = `Time: ${time}s`;

    if (time <= 0) nextQuestion();
  }, 1000);
}

/* ================= SELECT ANSWER ================= */
function selectAnswer(selected) {
  if (selected === questions[index].answer) score++;
  nextQuestion();
}

/* ================= NEXT QUESTION ================= */
function nextQuestion() {
  clearInterval(timerInterval);
  index++;

  if (index < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

/* ================= PROGRESS BAR ================= */
function updateProgress() {
  const percent = (index / questions.length) * 100;
  progressEl.style.width = percent + "%";
}

/* ================= HIGH SCORE (LocalStorage) ================= */
function saveHighScore(newScore) {
  const highScore = localStorage.getItem("quizHighScore") || 0;

  if (newScore > highScore) {
    localStorage.setItem("quizHighScore", newScore);
  }
}

/* ================= ANIMATED RESULT SCREEN ================= */
function showResult() {
  saveHighScore(score);

  const highScore = localStorage.getItem("quizHighScore");

  questionEl.innerHTML = `
    <div style="animation: pop 0.6s ease;">
      🎉 Your Score: <b>${score}/${questions.length}</b><br/>
      🏆 High Score: <b>${highScore}</b>
    </div>
  `;

  optionsEl.innerHTML = `
    <button onclick="location.reload()">Play Again</button>
  `;

  timerEl.style.display = "none";
  progressEl.style.width = "100%";
}

/* ================= START ================= */
loadQuestion();