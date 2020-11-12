const body = document.querySelector('body');
const board = document.createElement('div');
const playingField = document.createElement('div');
const control = document.createElement('div');
const time = document.createElement('div');
const newGame = document.createElement('button');
const step = document.createElement('div');

body.append(board);
board.append(control);
control.append(time);
control.append(newGame);
control.append(step);
board.append(playingField);

board.className = 'board';
control.className = 'control';
newGame.className = 'new-game-btn';
time.innerHTML = 'Time';
newGame.innerHTML = 'New Game';
step.innerHTML = 'Step';
playingField.className = 'playing-field';

for (let i = 1; i <= 15; i += 1) {
  const chip = document.createElement('div');
  chip.className = 'chip';
  chip.innerHTML = i;

  playingField.append(chip);
}
