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
const body = document.querySelector('body');

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

// Create navbar menu
const createMenu = (data) => {
  const { name, words } = data;
  const menuLink = `<li class="menu__item" data-words="${words}"><a href="#" class="menu__link">${name}</a></li>`;
  menu.insertAdjacentHTML('beforeend', menuLink);
};

// Open or close navbar menu
const showMenu = () => {
  menuButton.classList.toggle('is-active');
  navigation.classList.toggle('nav-visible');
  body.classList.toggle('overflow-hidden');
};

// Create card in main page
const createCard = (card) => {
  const { name, image, words } = card;
  const mainCard = `<div class="cards__item" data-words="${words}">
                  <img class="card-image" src="${image}"></img>
                  <span></span>
                  <h2 class="card-title">${name}</h2>
                </div>
              `;
  cardsOnMainPage.insertAdjacentHTML('beforeend', mainCard);
};

// Play sound card
const playSound = () => {
  const sound = new Audio();
  sound.src = "";
  sound.play();
};

// Create word card
const createCardWord = (words) => {
  const { name, image } = words;
  const wordCard = `
                  <div class="words__item">
                    <img class="card-image" src="${image}"></img>
                    <span></span>
                    <h2 class="card-title">${name}</h2>
                    <div><img class="reverse-image" src="assets/img/icon/reverse.svg"></img></div>
                    </div>`;
  cardsWithWords.insertAdjacentHTML('beforeend', wordCard);
};

// Open page cards with words
const openCards = (event) => {
  const { target } = event;
  const wordCard = target.closest('.cards__item');
  if (wordCard) {
    cardsWithWords.textContent = '';
    cardsContainer.classList.add('hide');
    wordsContainer.classList.remove('hide');
    getData(`./db/${wordCard.dataset.words}`).then((data) => {
      data.forEach(createCardWord);
    });
  }
};

// Open page cards with words
const menuOpenCards = (event) => {
  const { target } = event;
  const wordCard = target.closest('.menu__item');
  if (wordCard) {
    cardsWithWords.textContent = '';
    cardsContainer.classList.add('hide');
    wordsContainer.classList.remove('hide');
    getData(`./db/${wordCard.dataset.words}`).then((data) => {
      data.forEach(createCardWord);
    });
    menuButton.classList.remove('is-active');
    navigation.classList.remove('nav-visible');
    body.classList.remove('overflow-hidden');
  }
};

// Return to mane Page
const returnManePage = () => {
  cardsContainer.classList.remove('hide');
  wordsContainer.classList.add('hide');
};

getData('./db/main-cards.json').then((data) => {
  console.log(data);
  data.forEach(createCard);
  data.forEach(createMenu);
});

checkbox.addEventListener('click', startGame);
menuButton.addEventListener('click', showMenu);
cardsOnMainPage.addEventListener('click', openCards);
headerTitle.addEventListener('click', returnManePage);
menu.addEventListener('click', menuOpenCards);

// TEST
const test = (event) => {
  const { target } = event;
  const wordCard = target.closest('.words__item');
  console.log(wordCard);
};

cardsWithWords.addEventListener('click', test);
