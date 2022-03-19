'use strict';
// console.log(document.querySelector('.message').textContent);

// document.querySelector('.message').textContent = 'Correct Number';

// document.querySelector('.number').textContent = '20';

// document.querySelector('.score').textContent = '13';
let Random_Number = Math.trunc(Math.random() * 20) + 1;
document.querySelector('.number').textContent = '?';
let score = 20;
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    document.querySelector('.message').textContent = 'X no Number';
  }

  if (guess !== Random_Number) {
    if (score > 1) {
      guess < Random_Number
        ? (document.querySelector('.message').textContent = 'Too Low')
        : (document.querySelector('.message').textContent = 'Too Height');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = 'You lose the game';
      document.querySelector('.score').textContent = 0;
    }
  } else if (guess === Random_Number) {
    document.querySelector('.message').textContent = 'Win';
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = Random_Number;
    let Height_Score = Number(document.querySelector('.highscore').textContent);
    if (score >= Height_Score) {
      document.querySelector('.highscore').textContent = score;
    }
  }
});
document.querySelector('.again').addEventListener('click', function () {
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.message').textContent = 'Start guessing...';
  score = 20;
  document.querySelector('.score').textContent = score;
  Random_Number = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.guess').value = '';
});
