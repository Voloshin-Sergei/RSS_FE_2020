const checkbox = document.querySelector('.checkbox');
const label = document.querySelector('.label');
const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.nav');
const menu = document.querySelector('.menu');

const startGame = () => {
  document.body.classList.toggle('game');
  label.classList.toggle('game');
  menu.classList.toggle('game');
};

const showMenu = () => {
  menuButton.classList.toggle('is-active');
  navigation.classList.toggle('nav-visible');
};

checkbox.addEventListener('click', startGame);
menuButton.addEventListener('click', showMenu);
