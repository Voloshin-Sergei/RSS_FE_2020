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
const overlay = document.querySelector('.overlay');
const playBtn = document.querySelector('.play');
const wrapper = document.querySelector('.wrapper');

// Access to database
const getData = async function (url) {
  const response = await fetch(url);
  return await response.json();
};

// Open or close game mode
const startGame = () => {
  wrapper.classList.toggle('game');
  label.classList.toggle('game');
  menu.classList.toggle('game');
  playBtn.classList.toggle('hiden');
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
  overlay.classList.toggle('overlay-active');
};

// Create card in main page
const createCard = (card) => {
  const { name, image, words } = card;
  const mainCard = `
    <div class="cards__item" data-words="${words}">
      <img class="card-image" src="${image}"></img>
        <span></span>
        <h2 class="card-title">${name}</h2>
    </div>`;
  cardsOnMainPage.insertAdjacentHTML('beforeend', mainCard);
};

// Play sound card
const playSound = (url) => {
  const sound = new Audio();
  sound.src = url;
  sound.play();
};

// Create word card
const createCardWord = (words) => {
  overlay.classList.remove('overlay-active');
  const {
    name, image, translation, sound,
  } = words;
  const wordCard = `
    <div class="words__item">
      <img class="card-image front" src="${image}"></img>
      <img class="card-image-back back hide" src="${image}"></img
      <span></span>
      <h2 class="card-title front">${name}</h2>
      <h2 class="card-translation back hide">${translation}</h2>
      <div>
        <img class="reverse-image" src="assets/img/icon/reverse.svg"></img>
      </div>
      <audio preload = "auto" class = "card__audio">
        <source type ="audio/mp3" src="${sound}" />
      </audio>
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

// Reverse word card
const reversWordCard = (wordCard) => {
  const cardTranslation = wordCard.querySelector('.card-translation');
  const cardTitle = wordCard.querySelector('.card-title');
  const reverseImage = wordCard.querySelector('.reverse-image');
  const cardImage = wordCard.querySelector('.card-image');
  const cardImageBack = wordCard.querySelector('.card-image-back');

  cardTranslation.classList.add('revers');
  cardTranslation.classList.remove('back');
  cardTranslation.classList.remove('hide');

  cardImageBack.classList.add('revers');
  cardImageBack.classList.remove('back');
  cardImageBack.classList.remove('hide');

  cardTitle.classList.remove('revers');
  cardTitle.classList.add('back');
  cardTitle.classList.add('hide');

  cardImage.classList.remove('revers');
  cardImage.classList.add('back');
  cardImage.classList.add('hide');

  wordCard.classList.add('revers');
  reverseImage.classList.add('hide');

  wordCard.onmouseleave = () => {
    cardTranslation.classList.remove('revers');
    cardTranslation.classList.add('back');
    cardTranslation.classList.add('hide');

    cardImageBack.classList.remove('revers');
    cardImageBack.classList.add('back');
    cardImageBack.classList.add('hide');

    cardTitle.classList.remove('back');
    cardTitle.classList.remove('hide');

    cardImage.classList.remove('back');
    cardImage.classList.remove('hide');

    wordCard.classList.remove('revers');
    reverseImage.classList.remove('hide');
  };
};

// even for word card
const wordCardEvent = (event) => {
  const { target } = event;
  const wordCard = target.closest('.words__item');
  const wordSound = wordCard.querySelector('.card__audio source').src;
  const revers = target.closest('.reverse-image');
  if (!revers) {
    playSound(wordSound);
  } else if (revers) {
    reversWordCard(wordCard);
  }
};

// Return to mane Page
const returnManePage = () => {
  cardsContainer.classList.remove('hide');
  wordsContainer.classList.add('hide');
};

getData('./db/main-cards.json').then((data) => {
  data.forEach(createCard);
  data.forEach(createMenu);
});

checkbox.addEventListener('click', startGame);
menuButton.addEventListener('click', showMenu);
cardsOnMainPage.addEventListener('click', openCards);
headerTitle.addEventListener('click', returnManePage);
menu.addEventListener('click', menuOpenCards);
cardsWithWords.addEventListener('click', wordCardEvent);
overlay.addEventListener('click', showMenu);
