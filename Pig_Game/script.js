'use strict';
let score0 = document.getElementById('score--0');
let score1 = document.getElementById('score--1');
const dice = document.querySelector('.dice');
const btn_new = document.querySelector('.btn--new');
const btn_roll = document.querySelector('.btn--roll');
const btn_hold = document.querySelector('.btn--hold');

let scores, activePlayer, currentNumber, playing;

const init = function () {
  scores = [0, 0];
  activePlayer = 0;
  dice.classList.add('hidden');
  currentNumber = 0;
  playing = true;
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  currentNumber = 0;
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--active');
  document.querySelector(`.player--0`).classList.add('player--active');
};

init();

//roll dice
const fun_rollDice = function () {
  return Math.trunc(Math.random() * 6) + 1;
};
const fun_swichplayer = function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentNumber = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
};

btn_roll.addEventListener('click', function () {
  //1.ramdom show new dice
  if (playing) {
    dice.classList.remove('hidden');
    let diceNumber = fun_rollDice();
    dice.src = `dice-${diceNumber}.png`;
    if (diceNumber !== 1) {
      //current+=diceNumber
      currentNumber += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentNumber;
    } else {
      //switch player
      fun_swichplayer();
    }
  }
});

btn_hold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentNumber;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 10) {
      dice.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      fun_swichplayer();
    }
  }
});

btn_new.addEventListener('click', init);
