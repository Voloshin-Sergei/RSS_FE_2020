const body = document.querySelector('body');
// const board = document.createElement('div');
const playingField = document.createElement('div');
// const control = document.createElement('div');
// const time = document.createElement('div');
// const newGame = document.createElement('button');
// const step = document.createElement('div');
const chipSize = 100;
const emptyCell = { left: 0, top: 0, value: 0 };
let step = 0;
body.append(playingField);
// board.append(control);
// control.append(time);
// control.append(newGame);
// control.append(step);
// board.append(playingField);

// board.className = 'board';
// control.className = 'control';
// newGame.className = 'new-game-btn';
// time.innerHTML = 'Time';
// newGame.innerHTML = 'New Game';
// step.innerHTML = 'Step';
playingField.className = 'playing-field';

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
  step += 1;
  console.log(position);

  const isWon = position.every(chip => {
    return chip.value === chip.top * 4 + chip.left;
  });

  if (isWon) {
    alert('You Won!');
  }

};

const chips = [...Array(15).keys()]//.sort(() => Math.random() - 0.5);

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
    value: value
  });

  chip.style.left = `${left * chipSize}px`;
  chip.style.top = `${top * chipSize}px`;

  playingField.append(chip);

  chip.addEventListener('click', () => {
    move(i);
  });
}
