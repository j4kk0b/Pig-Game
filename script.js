"use strict";

const diceEl = document.querySelector(".dice");
const btnNewGame = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");

//Starting values
let currentScore = 0;
let activePlayer = 0;
const playerScores = [0, 0];

//Rolling dice
btnRoll.addEventListener("click", () => {
  //1. Generate random dice
  let diceNumber = Math.trunc(Math.random() * 6 + 1);

  //2. Display random dice
  diceEl.src = `dice-${diceNumber}.png`;
  diceEl.classList.remove("hidden");

  //3. If dice is 1 switch players
  if (diceNumber !== 1) {
    currentScore += diceNumber;
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayers();
  }
});

//Hold points button
btnHold.addEventListener("click", () => {
  playerScores[activePlayer] += currentScore;

  document.querySelector(`#score--${activePlayer}`).textContent =
    playerScores[activePlayer];

  if (playerScores[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");

    btnRoll.disabled = btnHold.disabled = true;
    diceEl.classList.add("hidden");
  } else {
    switchPlayers();
  }
});

//Swtich players
function switchPlayers() {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle("player--active");
  player1EL.classList.toggle("player--active");
}

//Reseting Game
btnNewGame.addEventListener("click", () => {
  location.reload();
});
