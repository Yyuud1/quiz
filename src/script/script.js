const questions = [
  {
    question: "Apa ibukota Indonesia?",
    options: ["Jakarta", "Bandung", "Surabaya", "Bali"],
    answer: "Jakarta",
  },
  {
    question: "Berapakah hasil dari 5 + 3?",
    options: ["5", "7", "8", "10"],
    answer: "8",
  },
  {
    question: "Apa makanan kesukaan ambo skom?",
    options: ["mendoyong", "rich", "bakso kematian", "nasi padang"],
    answer: "mendoyong",
  },
  {
    question: "siapa yang sering dianggap salah walopun dia emg ga salah",
    options: ["aldin", "rifaldy", "ambo", "yuda"],
    answer: "aldin",
  },
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

function loadQuestion() {
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
}

function selectAnswer(button, selected) {
  selectedAnswer = selected;
  let options = document.querySelectorAll(".option");
  options.forEach((btn) => btn.classList.remove("selected"));
  button.classList.add("selected");
}

function nextQuestion() {
  if (selectedAnswer === null) return;

  let correctAnswer = questions[currentQuestionIndex].answer;
  let options = document.querySelectorAll(".option");
  if (selectedAnswer === correctAnswer) {
    score++;
  }

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

function showResult() {
  const quizContainer = document.getElementById("quiz");
  const percent = Math.round((score / questions.length) * 100);
  let message =
    percent === 100
      ? "Sempurna!"
      : percent >= 75
      ? "Hebat!"
      : percent >= 50
      ? "Lumayan!"
      : "Coba lagi ya!";

  document.getElementById("progress").style.width = "100%";

  quizContainer.innerHTML = `
      <p id='result'>Skor Anda: ${score}/${questions.length} (${percent}%)</p>
      <p style="margin-top: 10px;">${message}</p>
      <button onclick="location.reload()">Ulangi Quiz</button>
    `;
}

function updateProgress() {
  const progress = document.getElementById("progress");
  const percent = (currentQuestionIndex / questions.length) * 100;
  progress.style.width = percent + "%";
}

document.getElementById("nextBtn").onclick = nextQuestion;
document.getElementById("nextBtn").style.display = "none";
loadQuestion();
