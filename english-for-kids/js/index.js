const checkbox = document.querySelector('.checkbox');
const label = document.querySelector('.label');
const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.nav');
const menu = document.querySelector('.menu');
const cardsOnMainPage = document.querySelector('.cards');
const cardsWithWords = document.querySelector('.words');
const cardsContainer = document.querySelector('.cards__container');
const wordsContainer = document.querySelector('.words__container');
const headerTitle = document.querySelector('.header-title');

// Access to database
const getData = async function (url) {
  const response = await fetch(url);
  return await response.json();
};

// Open or close game mode
const startGame = () => {
  document.body.classList.toggle('game');
  label.classList.toggle('game');
  menu.classList.toggle('game');
};

// Open or close navbar menu
const showMenu = () => {
  menuButton.classList.toggle('is-active');
  navigation.classList.toggle('nav-visible');
};

// Create card in main page
const createCard = (card) => {
  const { name, image } = card;
  const mainCard = `<div class="cards__item">
                  <img class="card-image" src="${image}"></img>
                  <span></span>
                  <h2 class="card-title">${name}</h2>
                </div>
              `;
  cardsOnMainPage.insertAdjacentHTML('beforeend', mainCard);
};

// Create word card
const createCardWord = () => {
  const wordCard = document.createElement('div');
  wordCard.className = 'words__item';
  wordCard.insertAdjacentHTML('beforeend', `
                    <img class="card-image" src="assets/img/card_img/animals/animals.svg"></img>
                    <span></span>
                    <h2 class="card-title">Animals</h2>
                    <div><img class="reverse-image" src="assets/img/icon/reverse.svg"></img></div>
  `);
  cardsWithWords.insertAdjacentElement('beforeend', wordCard);
};

// Open page cards with words
const openCards = (event) => {
  const { target } = event; // TODO maybe without this
  const wordCard = target.closest('.cards__item');
  if (wordCard) {
    cardsWithWords.textContent = '';
    cardsContainer.classList.add('hide');
    wordsContainer.classList.remove('hide');
  }
};

// Return to mane Page
const returnManePage = () => {
  cardsContainer.classList.remove('hide');
  wordsContainer.classList.add('hide');
};

getData('./db/main-cards.json').then((data) => {
  data.forEach(createCard);
});

checkbox.addEventListener('click', startGame);
menuButton.addEventListener('click', showMenu);
cardsOnMainPage.addEventListener('click', openCards);
headerTitle.addEventListener('click', returnManePage);
