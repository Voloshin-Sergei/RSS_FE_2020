const body = document.querySelector('body');
const board = document.createElement('div');
const playingField = document.createElement('div');
const control = document.createElement('div');
const timer = document.createElement('div');
const timerShow = document.createElement('div');
const newGame = document.createElement('button');
const step = document.createElement('div');
const chipSize = 100;
const wonWindow = document.createElement('div');
const wonTime = document.createElement('div');
const wonMoves = document.createElement('div');
const closeBtn = document.createElement('span');
const bestScore = document.createElement('div');

let moves = 0;
let time = 0;
let run = false;

localStorage.setItem('bestMovies', '0');
localStorage.setItem('bestTime', 0);

const createBoard = () => {
  board.className = 'board';
  control.className = 'control';
  newGame.className = 'new-game-btn';
  playingField.className = 'playing-field';
  wonWindow.className = 'window';
  closeBtn.className = 'closeBtn';
  bestScore.className = 'bestScore';

  body.append(board);
  board.append(control);
  control.append(timer);
  control.append(timerShow);
  control.append(newGame);
  control.append(step);
  board.append(playingField);

  board.append(wonWindow);

  timer.innerHTML = 'Time: ';
  timerShow.innerHTML = '0:00:00';
  newGame.innerHTML = 'New Game';
  step.innerHTML = 'Moves: 0';
};

const setTime = () => {
  const twoDigitTimerValue = 10;
  if (run) {
    const hour = Math.floor(time / 3600) % 24;
    let min = Math.floor(time / 60) % 60;
    let sec = Math.floor(time % 60);
    time += 1;

    if (min < twoDigitTimerValue) {
      min = `0${min}`;
    }
    if (sec < twoDigitTimerValue) {
      sec = `0${sec}`;
    }
    timerShow.innerHTML = `${hour}:${min}:${sec}`;
    setTimeout(setTime, 1000);
  }
};

const soundMove = () => {
  const sound = new Audio();
  sound.src = 'move.mp3';
  sound.play();
};

const modalWindow = (gameTime, gameMoves) => {
  wonWindow.style.display = 'flex';
  wonWindow.innerHTML = 'You Won!';
  wonWindow.append(closeBtn);
  closeBtn.innerHTML = '&times';
  wonWindow.append(wonTime);
  wonTime.innerHTML = `Time: ${gameTime}`;
  wonWindow.append(wonMoves);
  wonMoves.innerHTML = `Moves: ${gameMoves}`;
};

const startGame = () => {
  moves = 0;
  const emptyCell = { left: 0, top: 0, value: 0 };

  const position = [];
  position.push(emptyCell);

  const move = (index) => {
    const chip = position[index];
    const leftDifference = Math.abs(emptyCell.left - chip.left);
    const topDifference = Math.abs(emptyCell.top - chip.top);
    if (leftDifference + topDifference > 1) {
      return;
    }

    chip.element.style.left = `${emptyCell.left * chipSize}px`;
    chip.element.style.top = `${emptyCell.top * chipSize}px`;

    const emptyCellLeft = emptyCell.left;
    const emptyCellTop = emptyCell.top;
    emptyCell.left = chip.left;
    emptyCell.top = chip.top;
    chip.left = emptyCellLeft;
    chip.top = emptyCellTop;
    moves += 1;
    if (moves === 1 && moves < 2) {
      run = true;
      setTime();
    }
    soundMove();
    step.innerHTML = `Moves: ${moves}`;
    const isWon = position.every(chip => chip.value === chip.top * 4 + chip.left);
    if (isWon) {
      run = false;
      let gameTime = timerShow.innerHTML;
      console.log(typeof gameTime);
      let gameMoves = moves;
      if (Number(gameTime.split(':').join('')) < Number(localStorage.getItem('bestTime').split(':').join('')) || localStorage.getItem('bestTime') === '0') {
        localStorage.setItem('bestTime', gameTime);
      }
      if (gameMoves < Number(localStorage.getItem('bestMovies')) || Number(localStorage.getItem('bestMovies')) === 0) {
        localStorage.setItem('bestMovies', gameMoves);
      }
      body.append(bestScore);
      bestScore.innerHTML = `Your best result: ${localStorage.getItem('bestTime')} Movies: ${localStorage.getItem('bestMovies')}`;
      modalWindow(gameTime, gameMoves);
    }
  };

  const chips = [...Array(15).keys()].sort(() => Math.random() - 0.5);
  /* an array of numbers from 0 to 15
  is sorted randomly by the Math method,
   with a step of 0.5 half the width of the generated range */
  for (let i = 1; i <= 15; i += 1) {
    const chip = document.createElement('div');
    const value = chips[i - 1] + 1;
    chip.className = 'chip';
    chip.innerHTML = value;

    const left = i % 4;
    const top = (i - left) / 4;

    position.push({
      left: left,
      top: top,
      element: chip,
      value: value,
    });

    chip.style.left = `${left * chipSize}px`;
    chip.style.top = `${top * chipSize}px`;

    playingField.append(chip);

    chip.addEventListener('click', () => {
      move(i);
    });
    chip.removeEventListener('click', move);
  }
};

closeBtn.addEventListener('click', () => {
  wonWindow.style.display = 'none';
});

newGame.addEventListener('click', () => {
  playingField.innerHTML = '';
  moves = 0;
  time = 0;
  step.innerHTML = 'Moves: 0';
  timerShow.innerHTML = '0:00:00';
  run = false;
  startGame();
});

createBoard();