const questions = [
  {
    question:
      "Apa kegiatan buang-buang waktu dan berdosa yang kebanyakan dilakukan manusia?",
    options: [
      "Gibah",
      "Urusin Hidup Orang",
      "Dak Senang Melihat Orang Suskes",
      "Sabar & ikhtiar",
    ],
    answer: "gibah",
  },
  {
    question:
      "andi berjalan dengan kecepatan 50km/h dengan motor, jarak yang ditepuh andi 100km, siapa nama bapak andi ?",
    options: ["Salman", "Andianto", "Surya", "Solimin"],
    answer: "Andianto",
  },
  {
    question: "apa kepanjangan USB?",
    options: [
      "Universal Serial Bus",
      "Unit Sentral Bus",
      "Ugh Sakit Bang",
      "Udah Siap Bangkit",
    ],
    answer: "Universal Serial Bus",
  },
  {
    question:
      "manusia yang selalu dianggap salah. namun jika tidak ada dia, dunia tidak akan berevolusi seperti sekarang?",
    options: ["alien", "laki-laki", "perempuan", "monster"],
    answer: "laki-laki",
  },
  {
    question: "Negara terbesar",
    options: ["indonesia", "russia", "amerika", "argentina"],
    answer: "russia",
  },
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let timerInterval;

function startQuiz() {
  document.getElementById("intro").style.display = "none";
  document.querySelector(".container").style.display = "block";
  loadQuestion();
}

function loadQuestion() {
  clearInterval(timerInterval);
  let q = questions[currentQuestionIndex];
  document.getElementById("question").textContent = q.question;
  let optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  selectedAnswer = null;

  q.options.forEach((option) => {
    let button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option");
    button.onclick = () => selectAnswer(button, option);
    optionsDiv.appendChild(button);
  });

  updateProgress();
  document.getElementById("nextBtn").style.display = "block";
  startTimer();
}

function selectAnswer(button, selected) {
  selectedAnswer = selected;
  let options = document.querySelectorAll(".option");
  options.forEach((btn) => btn.classList.remove("selected"));
  button.classList.add("selected");
}

function nextQuestion() {
  if (selectedAnswer === null) return;

  clearInterval(timerInterval);

  let correctAnswer = questions[currentQuestionIndex].answer;
  let options = document.querySelectorAll(".option");

  if (selectedAnswer === correctAnswer) score++;

  options.forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct");
    } else if (
      btn.textContent === selectedAnswer &&
      selectedAnswer !== correctAnswer
    ) {
      btn.classList.add("wrong");
    }
  });

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }, 100);
}

function autoNextQuestion() {
  if (selectedAnswer === null) {
    let options = document.querySelectorAll(".option");
    let correctAnswer = questions[currentQuestionIndex].answer;

    options.forEach((btn) => {
      btn.disabled = true;
      if (btn.textContent === correctAnswer) {
        btn.classList.add("correct");
      }
    });
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }, 500);
}

function showResult() {
  clearInterval(timerInterval);

  const quizContainer = document.getElementById("quiz");
  const percent = Math.round((score / questions.length) * 100);
  let message =
    percent === 100
      ? "Sempurna!"
      : percent >= 75
      ? "Lumayan!"
      : percent >= 50
      ? "Tolol!"
      : "Emang Bodoh!";

  document.getElementById("progress").style.width = "100%";
  document.querySelector(".circle-timer").style.display = "none";

  quizContainer.innerHTML = `
        <p id='result'>Skor Anda: ${score}/${questions.length} (${percent}%)</p>
        <p style="margin-top: 10px;">${message}</p>
        <button id="restartBtn" onclick="location.reload()">Ulangi Quiz</button>
      `;
}

function updateProgress() {
  const progress = document.getElementById("progress");
  const percent = (currentQuestionIndex / questions.length) * 100;
  progress.style.width = percent + "%";
}

// CIRCULAR TIMER
function startTimer() {
  const circle = document.getElementById("progressCircle");
  const timeText = document.getElementById("timeText");
  let timeLeft = 10;
  const radius = 28;
  const circumference = 2 * Math.PI * radius;

  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = 0;
  timeText.textContent = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    timeText.textContent = timeLeft;

    const offset = circumference - (timeLeft / 10) * circumference;
    circle.style.strokeDashoffset = offset;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      autoNextQuestion();
    }
  }, 1000);
}

document.querySelector(".container").style.display = "none";

document.getElementById("nextBtn").onclick = nextQuestion;
document.getElementById("nextBtn").style.display = "none";

loadQuestion();
