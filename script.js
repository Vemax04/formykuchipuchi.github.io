    // Fade-in on scroll
    const sections = document.querySelectorAll('.fade');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.2 });
    sections.forEach(s => observer.observe(s));
    
const openGame = document.getElementById("openGame");
const gameModal = document.getElementById("gameModal");
const startBtn = document.getElementById("startBtn");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const gameTitle = document.getElementById("gameTitle");
const gameArea = document.getElementById("gameArea");

let score = 0;
let timeLeft = 30;
let heartInterval, timerInterval;

// 🎮 Open modal
openGame.addEventListener("click", () => {
  gameModal.style.display = "flex";
  resetGame();
});

// 🔄 Reset Game
function resetGame() {
  score = 0;
  timeLeft = 30;
  gameTitle.textContent = "Catch the Hearts & Kitty! 💞";
  scoreDisplay.textContent = "Hearts Caught: 0";
  timerDisplay.textContent = "Time Left: 30s";
  startBtn.textContent = "Start";
  gameArea.innerHTML = "";
}

// 🎯 Start Game
startBtn.addEventListener("click", () => {
  if (startBtn.textContent === "Try Again") resetGame();
  startBtn.style.display = "none";
  startFalling();
  startTimer();
});

// ❤️ Hearts + Kitty fall
function startFalling() {
  heartInterval = setInterval(() => {
    const isKitty = Math.random() < 0.1;
    const item = document.createElement(isKitty ? "img" : "span");
    item.classList.add(isKitty ? "kitty" : "heart");
    if (isKitty) item.src = "assets/kitty.jpg";
    else item.textContent = "❤️";
    item.style.left = Math.random() * 90 + "%";
    gameArea.appendChild(item);

    item.addEventListener("click", () => {
      score += isKitty ? 3 : 1;
      scoreDisplay.textContent = `Hearts ${score}`;  // ✅ fixed
      item.remove();
      if (score >= 15) endGame(true);
    });

    setTimeout(() => item.remove(), 3000);
  }, 700);
}

// ⏱ Timer
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time ${timeLeft}s`;  // ✅ fixed
    if (timeLeft <= 0) endGame(false);
  }, 1000);
}


// 🏁 End Game
function endGame(won) {
  clearInterval(heartInterval);
  clearInterval(timerInterval);
  document.querySelectorAll(".heart, .kitty").forEach(el => el.remove());
  startBtn.style.display = "inline-block";

  if (won) {
    gameTitle.textContent = "Thank you for playing! 💖\nMy heart is yours to catch, always.";
    startBtn.textContent = "Close";
    startBtn.onclick = () => (gameModal.style.display = "none");
  } else {
    gameTitle.textContent = "Game Over! 😢\nYou caught ${score} hearts! Try again to reach 15 hearts!";
    startBtn.textContent = "Try Again";
  }
}

const completeModal = document.getElementById("completeModal");
const closeComplete = document.getElementById("closeComplete");

// 🎉 Simple confetti effect
function launchConfetti() {
  for (let i = 0; i < 40; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.backgroundColor = 'hsl(${Math.random() * 360}, 80%, 60%)';
    confetti.style.animationDelay = Math.random() * 2 + "s";
    completeModal.appendChild(confetti);
    setTimeout(() => confetti.remove(), 4000);
  }
}

// 💖 Confetti style
const style = document.createElement("style");
style.textContent = `
.confetti {
  position: absolute;
  width: 8px;
  height: 12px;
  left: -20px; /* adjust or randomize later */
  border-radius: 2px;
  animation: confettiFall 4s ease-in forwards;
}

@keyframes confettiFall {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(600px) rotate(720deg); opacity: 0; }
}
`;
document.head.appendChild(style);

// 🏁 Modify the "endGame" function
function endGame(won) {
  clearInterval(heartInterval);
  clearInterval(timerInterval);
  document.querySelectorAll(".heart, .kitty").forEach(el => el.remove());
  startBtn.style.display = "inline-block";

  if (won) {
    // hide game modal first
    gameModal.style.display = "none";
    // after a small delay show complete popup
    setTimeout(() => {
      completeModal.style.display = "flex";
      launchConfetti();
    }, 500);
  } else {
    gameTitle.textContent = "Game Over! 😢\nYou caught ${score} hearts! Try again to reach 15 hearts!";
    startBtn.textContent = "Try Again";
  }
}

// 🔘 Close complete popup
closeComplete.addEventListener("click", () => {
  completeModal.style.display = "none";
});