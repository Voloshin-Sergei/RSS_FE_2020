const body = document.querySelector('body');
 const board = document.createElement('div');
const playingField = document.createElement('div');
 const control = document.createElement('div');
 const timer = document.createElement('div');
 const newGame = document.createElement('button');
const step = document.createElement('div');
const chipSize = 100;
let moves = 0;


body.append(board);
 board.append(control);
 control.append(timer);
 control.append(newGame);
 control.append(step);
 board.append(playingField);

 board.className = 'board';
 control.className = 'control';
 newGame.className = 'new-game-btn';
 timer.innerHTML = 'Time';
 newGame.innerHTML = 'New Game';
 step.innerHTML = '0';
playingField.className = 'playing-field';



let time = 0;


function setTime() {
  
  let hour = Math.floor(time / 3600) % 24;
  let min = Math.floor(time / 60) % 60;
  let sec = Math.floor(time % 60);
  time++;

  if(min < 10){
    min = "0" + min;
  } 
  if(sec < 10){
    sec = "0" + sec;
  }
  
  timer.innerHTML = `Time: ${hour}:${min}:${sec}`;

  setTimeout(setTime, 1000);
  console.log(timer);
}




const game = () => {
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
      setTime();
    }
    step.innerHTML = `${moves}`;
    console.log(moves);



  
    const isWon = position.every(chip => {
      return chip.value === chip.top * 4 + chip.left;
    });
  
    if (isWon) {
      alert('You Won!');
    }
  
  };

  const chips = [...Array(15).keys()]; //.sort(() => Math.random() - 0.5);
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
};

newGame.addEventListener('click', () => {
  playingField.innerHTML = '';
  moves = 0;
  step.innerHTML = '0';
  timer.innerHTML = `Time: 00: 00: 00`;

  game();

  });





  game();