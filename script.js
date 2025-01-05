const startScreen = document.getElementById('start-screen');
const gameContainer = document.getElementById('game-container');
const endScreen = document.getElementById('end-screen');
const resultAnimation = document.getElementById('result-animation');
const resultMessage = document.getElementById('result-message');

const startMusic = document.getElementById('start-music');
const gameMusic = document.getElementById('game-music');
const hitSound = document.getElementById('hit-sound');
const missSound = document.getElementById('miss-sound');
const scoreHigh = document.getElementById('score-high');
const scoreMedium = document.getElementById('score-medium');
const scoreLow = document.getElementById('score-low');

const startButton = document.getElementById('start-btn');
const restartButton = document.getElementById('restart-btn');
const scoreDisplay = document.getElementById('score');
const holes = document.querySelectorAll('.hole');

let score = 0;
let timer;

function randomHole() {
  const idx = Math.floor(Math.random() * holes.length);
  return holes[idx];
}

function showMole() {
  const hole = randomHole();
  const mole = document.createElement('div');
  mole.classList.add('mole');
  hole.appendChild(mole);

  mole.addEventListener('click', () => {
    score++;
    hitSound.play();
    scoreDisplay.textContent = score;
    mole.remove();
  });

  setTimeout(() => {
    if (hole.contains(mole)) {
      missSound.play();
      mole.remove();
    }
  }, 800);
}

let countdown; // Variable to hold the timer countdown
const timerDisplay = document.getElementById('timer'); // Get timer element

function startGame() {
  score = 0;
  scoreDisplay.textContent = score;

  startScreen.style.display = 'none';
  endScreen.style.display = 'none';
  gameContainer.style.display = 'block';

  startMusic.pause();
  startMusic.currentTime = 0;
  gameMusic.play();

  let timeLeft = 30; // 30 seconds countdown
  timerDisplay.textContent = `Time Left: ${timeLeft}`; // Initialize timer display

  timer = setInterval(showMole, 800);

    // Countdown logic
  countdown = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time Left: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(countdown); // Stop countdown
            clearInterval(timer); // Stop mole interval
            timerDisplay.textContent = 'Time\'s up!'; // Show Time's up!
            setTimeout(endGame, 2000);
        }
      }, 1000);
    
      // Stop the game after 30 seconds
      setTimeout(() => {
        clearInterval(timer);
      }, 30000);
    }

function endGame() {
  clearInterval(timer);
  gameContainer.style.display = 'none';
  endScreen.style.display = 'flex';
  gameMusic.pause();

  if (score > 28) {
    resultAnimation.innerHTML = '<img src="https://i.pinimg.com/736x/f4/41/6d/f4416d74306c82642066d1c9253db018.jpg" alt="Amazed">';
    resultMessage.textContent = 'You are amazing! Always knew you were the coolest :)';
    scoreHigh.play();
  } else if (score >= 15) {
    resultAnimation.innerHTML = '<img src="https://i.pinimg.com/236x/ff/75/8f/ff758fb5fb05c1cae21036ffc76d8a2f.jpg" alt="Thumbs Up">';
    resultMessage.textContent = 'Good job! You are so cool :)';
    scoreMedium.play();
  } else {
    resultAnimation.innerHTML = '<img src="https://i.pinimg.com/236x/a3/2b/f0/a32bf0a268dfea855c14efb49cb5f498.jpg" alt="Try Again">';
    resultMessage.textContent = 'Let’s try harder next time! We believe in you :)';
    scoreLow.play();
  }
}

function endGame() {
  clearInterval(timer);
  gameContainer.style.display = 'none';
  endScreen.style.display = 'flex';
  gameMusic.pause();
  
  // Set the final score
  document.getElementById('final-score').textContent = score;

  if (score > 28) {
    resultAnimation.innerHTML = '<img src="https://i.pinimg.com/736x/f4/41/6d/f4416d74306c82642066d1c9253db018.jpg" alt="Amazed">';
    resultMessage.textContent = 'You are amazing! Always knew you were the coolest :)';
    scoreHigh.play();
  } else if (score >= 15) {
    resultAnimation.innerHTML = '<img src="https://i.pinimg.com/236x/ff/75/8f/ff758fb5fb05c1cae21036ffc76d8a2f.jpg" alt="Thumbs Up">';
    resultMessage.textContent = 'Good job! You are so cool :)';
    scoreMedium.play();
  } else {
    resultAnimation.innerHTML = '<img src="https://i.pinimg.com/236x/a3/2b/f0/a32bf0a268dfea855c14efb49cb5f498.jpg" alt="Try Again">';
    resultMessage.textContent = "Let's try harder next time! We believe in you :)";
    scoreLow.play();
  }
}

startButton.addEventListener('click', () => {
  startMusic.play();
  startGame();
});

restartButton.addEventListener('click', startGame);
