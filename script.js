// Civic Sense interactive quiz and mobile navigation
const questions = [
  { question: "You see someone drop litter in a public park. What is a responsible action?", answers: ["Ignore it and walk away", "Put your own waste in a bin and politely encourage cleanliness", "Add more litter to the same spot", "Leave the park immediately"], correct: 1, explanation: "Keeping shared spaces clean is everyone's responsibility. Set a good example and encourage others politely." },
  { question: "What should you do when the pedestrian signal is red?", answers: ["Cross if no car is nearby", "Run across quickly", "Wait until it is safe and the signal allows you to cross", "Follow the person in front without checking"], correct: 2, explanation: "Following pedestrian signals helps protect you and other road users." },
  { question: "Which action helps reduce plastic waste?", answers: ["Use a reusable shopping bag", "Take a new plastic bag every time", "Throw plastic into a river", "Use disposable items whenever possible"], correct: 0, explanation: "Reusable bags reduce the need for single-use plastic." },
  { question: "How should we behave in a public library?", answers: ["Play music loudly", "Leave books on the floor", "Disturb other readers", "Keep noise low and handle books carefully"], correct: 3, explanation: "A library is a shared learning space. Quiet and careful behaviour respects everyone." },
  { question: "Why should we protect public property?", answers: ["It belongs only to officials", "It is shared by the community and serves everyone", "It can be replaced at no cost", "It does not need maintenance"], correct: 1, explanation: "Public property is for community use. Looking after it benefits everyone." }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

const questionText = document.getElementById("questionText");
const answerList = document.getElementById("answerList");
const questionCount = document.getElementById("questionCount");
const progressFill = document.getElementById("progressFill");
const nextButton = document.getElementById("nextButton");
const quizContent = document.getElementById("quizContent");
const quizResult = document.getElementById("quizResult");

function renderQuestion() {
  const item = questions[currentQuestion];
  selectedAnswer = null;
  questionCount.textContent = `QUESTION ${currentQuestion + 1} OF ${questions.length}`;
  progressFill.style.width = `${(currentQuestion / questions.length) * 100}%`;
  questionText.textContent = item.question;
  answerList.innerHTML = "";
  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-option";
    button.type = "button";
    button.innerHTML = `<span class="answer-letter">${String.fromCharCode(65 + index)}</span><span></span>`;
    button.querySelector("span:last-child").textContent = answer;
    button.addEventListener("click", () => {
      selectedAnswer = index;
      document.querySelectorAll(".answer-option").forEach(option => option.classList.remove("selected"));
      button.classList.add("selected");
      nextButton.disabled = false;
    });
    answerList.appendChild(button);
  });
  nextButton.disabled = true;
  nextButton.innerHTML = currentQuestion === questions.length - 1 ? "See my result →" : "Next question →";
}

nextButton.addEventListener("click", () => {
  if (selectedAnswer === null) return;
  if (selectedAnswer === questions[currentQuestion].correct) score++;
  currentQuestion++;
  if (currentQuestion < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizContent.classList.add("hidden");
  quizResult.classList.remove("hidden");
  progressFill.style.width = "100%";
  questionCount.textContent = "ALL QUESTIONS COMPLETED";
  document.getElementById("resultTitle").textContent = score === questions.length ? "Perfect score!" : score >= 3 ? "Great effort!" : "Keep learning!";
  document.getElementById("resultText").textContent = `You scored ${score} out of ${questions.length}. ${score >= 4 ? "You are building thoughtful civic habits. Keep setting a good example!" : "Every day is a new chance to practise good civic habits. Review the topics and try again!"}`;
}

document.getElementById("restartButton").addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  quizResult.classList.add("hidden");
  quizContent.classList.remove("hidden");
  renderQuestion();
});

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

document.getElementById("year").textContent = new Date().getFullYear();
renderQuestion();
