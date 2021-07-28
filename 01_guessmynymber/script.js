'use strict';
let secretNumber = Math.trunc(20 * Math.random() + 1);
let highScore = 0;
let score = 20;
const lostGame = 'You lost the game';
const messageHigh = '📈 Too high!';
const messageLow = '📉 Too low!';

const displayMessage = function (message, clas) {
  document.querySelector(clas).textContent = message;
};
const displayValue = function (message, clas) {
  document.querySelector(clas).value = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  //STILL PLAYING
  if (score > 1) {
    // NO INPUT
    if (!guess) {
      displayMessage('No number!! :(', '.message');
      //CORRECT NUMBER
    } else if (guess === secretNumber) {
      displayMessage(secretNumber, '.number');
      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').style.width = '30rem';
      if (score > highScore) {
        highScore = score;
        displayMessage(highScore, '.highscore');
      }
    }
    //DIFFERENT VALUE
    else if (secretNumber !== guess) {
      score--;
      secretNumber < guess
        ? displayMessage(messageHigh, '.message')
        : displayMessage(messageLow, '.message');
      displayValue(null, '.guess');
      displayMessage(`💯 Score: ${score}`, '.label-score');
    }
    //LOST GAME
  } else {
    displayMessage(lostGame, '.message');
    displayMessage(`💯 Score: 0`, '.label-score');
    document.querySelector('body').style.backgroundColor = 'red';
  }
});

document.querySelector('.again').addEventListener('click', function () {
  secretNumber = Math.trunc(20 * Math.random() + 1);
  score = 20;
  displayMessage('?', '.number');
  displayValue(null, '.guess');
  displayMessage(`💯 Score: ${score}`, '.label-score');
  document.querySelector('body').style.backgroundColor = '#222222';
  document.querySelector('.number').style.width = '15rem';
});
