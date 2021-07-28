'use strict';
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const dice = document.querySelector('.dice');
let diceValue = 0;

//remove dice at start
dice.classList.add('hidden');

const endGame = function () {
  if (
    player1.classList.contains('player--winner') ||
    player0.classList.contains('player--winner')
  ) {
    return true;
  }
  return false;
};

const getActivePlayer = function (player) {
  return player.classList.contains('player--active');
};

const changeActivePlayer = function (playerON, playerOFF) {
  playerON.classList.add('player--active');
  playerOFF.classList.remove('player--active');
  setCurrentScore(playerOFF, 0);
};

const getCurrentScore = function (player) {
  const currentScore = Number(
    player.querySelector('.current-score').textContent
  );
  return currentScore;
};

const setCurrentScore = function (player, currentScore) {
  currentScore === 0
    ? (player.querySelector('.current-score').textContent = currentScore)
    : (player.querySelector('.current-score').textContent =
        getCurrentScore(player) + currentScore);
};

const setScore = function (player, score) {
  const prevScore = Number(player.querySelector('.score').textContent);
  const total = prevScore + score;
  player.querySelector('.score').textContent = prevScore + score;

  if (total >= 100) {
    console.log(player);
    dice.classList.add('hidden');
    player.classList.add('player--winner');
  }
  if (score == 0) {
    player.querySelector('.score').textContent = score;
  }
};

const removeWinner = function () {
  player0.classList.contains('player--winner')
    ? player0.classList.remove('player--winner')
    : player1.classList.remove('player--winner');
};

//BTN ROLL
btnRoll.addEventListener('click', function () {
  let diceValue = Math.trunc(Math.random() * 6 + 1);
  if (!endGame()) {
    dice.classList.remove('hidden');
    dice.src = `dice-${diceValue}.png`;
    if (diceValue !== 1) {
      player0.classList.contains('player--active')
        ? setCurrentScore(player0, diceValue)
        : setCurrentScore(player1, diceValue);
    } else {
      player0.classList.contains('player--active')
        ? changeActivePlayer(player1, player0)
        : changeActivePlayer(player0, player1);
    }
  }
});

btnHold.addEventListener('click', function () {
  dice.classList.add('hidden');
  if (!endGame()) {
    if (getActivePlayer(player0)) {
      setScore(player0, getCurrentScore(player0));
      changeActivePlayer(player1, player0);
    } else {
      setScore(player1, getCurrentScore(player1));
      changeActivePlayer(player0, player1);
    }
  }
});

btnNew.addEventListener('click', function () {
  setScore(player1, 0);
  setScore(player0, 0);
  removeWinner();
});
