const rollDiceBtn = document.getElementsByClassName("btn-roll")[0];
const dice = document.getElementById("dice");
const newBtn = document.getElementsByClassName("btn-new")[0];
const holdBtn = document.getElementsByClassName("btn-hold")[0];

let playerNumber, roundTotal;
let playerScores = [0, 0];
let gamePlaying = false;

startGame();
newBtn.addEventListener("click", startGame);

rollDiceBtn.addEventListener("click", (e) => {
  if (e.target.className == "btn-roll" && gamePlaying) {
    dice.style.display = "block";
    const diceNum = generateRandomNum();
    dice.src = `dice-${diceNum}.png`;
    if (diceNum !== 1) {
      roundTotal += diceNum;
      document.getElementById(
        `current-${playerNumber}`
      ).textContent = roundTotal;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  document.getElementById(`current-${playerNumber}`).textContent = 0;
  dice.style.display = "none";
  roundTotal = 0;
  playerNumber === 0 ? (playerNumber = 1) : (playerNumber = 0);
  document.querySelector(`.player-0-panel`).classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}

holdBtn.addEventListener("click", (e) => {
  if (e.target.className == "btn-hold" && gamePlaying) {
    const score = document.getElementById(`score-${playerNumber}`);
    // score.textContent = roundTotal;
    playerScores[playerNumber] += roundTotal;
    score.textContent = playerScores[playerNumber];
    checkWinner();
  }
});

//Helper Functions
function generateRandomNum() {
  return Math.floor(Math.random() * 6) + 1;
}

function startGame() {
  gamePlaying = true;
  playerNumber = 0;
  roundTotal = 0;
  playerScores = [0, 0];
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;
  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;
  document.querySelector(`#name-0`).textContent = "PLAYER 1";
  document.querySelector(`#name-1`).textContent = "PLAYER 2";
  document.querySelector(`.player-0-panel`).classList.remove("winner");
  document.querySelector(`.player-1-panel`).classList.remove("winner");
  document.querySelector(`.player-0-panel`).classList.add("active");
  document.querySelector(`.player-1-panel`).classList.remove("active");

  dice.style.display = "none";
}

function checkWinner() {
  if (playerScores[playerNumber] >= 30) {
    gamePlaying = false;
    document.querySelector(`#name-${playerNumber}`).textContent = "WINNER";
    document
      .querySelector(`.player-${playerNumber}-panel`)
      .classList.add("winner");
    document
      .querySelector(`.player-${playerNumber}-panel`)
      .classList.remove("active");
  } else nextPlayer();
}
