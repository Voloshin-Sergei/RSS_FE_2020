const checkbox = document.getElementById('checkbox');
const label = document.querySelector('label');

const startGame = () => {
  document.body.classList.toggle('game');
  label.classList.toggle('game');
};

checkbox.addEventListener('click', startGame);
