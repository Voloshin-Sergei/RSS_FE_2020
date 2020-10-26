const burger = document.querySelector('.burger-menu__button');
const mobileMenu = document.querySelector('.mobile-menu');
const overlay = document.querySelector('.burger-menu_overlay');
const links = document.querySelector('.list__link');
const body = document.querySelector('.body');
let burgerShow = false;

function burgerMenu() {
if (burgerShow == true) {
    burger.classList.remove('burger-menu__button_active');
    mobileMenu.classList.remove('mobile-menu_active');
    overlay.classList.remove('burger-menu_overlay-active');
    body.classList.remove('overflow-hidden');
} else {
    burger.classList.add('burger-menu__button_active');
    mobileMenu.classList.add('mobile-menu_active');
    overlay.classList.add('burger-menu_overlay-active');
    body.classList.add('overflow-hidden');
}
burgerShow = !burgerShow;
};

function close()  {
burgerMenu();
};

burger.addEventListener("click", burgerMenu);
links.addEventListener("click", close);
overlay.addEventListener("click", close);