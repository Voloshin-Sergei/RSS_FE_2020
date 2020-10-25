// DOM Elements
const time = document.getElementById('time'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    focus = document.getElementById('focus'),
    date = document.getElementById('date'),
    dayBackground = [];


// Сreation background massive
function backgroundForDay () {
    for (let i = 0; i < 24; i++) {
        dayBackground.push(Math.floor(Math.random() * 20));
        console.log(dayBackground);
    }
};

backgroundForDay();

// Show Date 
function showDate() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let today = new Date(),
        weekDay = today.getDay(),
        day = today.getDate(),
        month = today.getMonth();
        
// Output Date
date.innerHTML = `${days[weekDay]}<span>, </span>${day} ${months[month]}`;
};

// Show Time
function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();
    if (min == 59 && sec == 59) {
        setBgGreet();
    };
// Output Time
time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

setTimeout(showTime, 1000);
};

// Add Zero
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
};

// Set Background and Greeting
function setBgGreet() {
    let today = new Date(),
        hour = today.getHours();

    if(hour >= 0 && hour < 6) {
        //Night
        document.body.style.backgroundImage = `url('assets/night/${dayBackground[hour]}.jpg')`;
        greeting.textContent = 'Good Night,';
    } else if(hour > 6 && hour < 12) {
        //Morning
        document.body.style.backgroundImage = `url('assets/morning/${dayBackground[hour]}.jpg')`;
        greeting.textContent = 'Good Morning,';
    } else if(hour >= 12 && hour < 18) {
        //Afternoon
        document.body.style.backgroundImage = `url('assets/day/${dayBackground[hour]}.jpg')`;
        greeting.textContent = 'Good Afternoon,';
    } else {
        // Evening
        document.body.style.backgroundImage = `url('assets/evening/${dayBackground[hour]}.jpg')`;
        greeting.textContent = 'Good Evening,';
    }
    //setTimeout(setBgGreet, 3600000);
};

// Get Name
function getName() {
    if(localStorage.getItem('name') === null || localStorage.getItem('name') === '') {
        name.textContent = '[Enter Name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
};

// Set Name 
function setName(e) {
    if (e.type === 'keypress') {
        //Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('name', e.target.innerText);
            name.blur();
        }
    } else {
        localStorage.setItem('name', e.target.innerText);
    }
};

// Get Focus
function getFocus() {
    if(localStorage.getItem('focus') === null|| localStorage.getItem('focus') === '') {
        focus.textContent = '[Enter Focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
};

// Set Focus 
function setFocus(e) {
    if (e.type === 'keypress') {
        //Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('focus', e.target.innerText);
            focus.blur();
        }
    } else {
        localStorage.setItem('focus', e.target.innerText);
    }
};

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

//Show Quote

const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btn = document.querySelector('.next-quote');

async function getQuote() {  
const url = `https://type.fit/api/quotes`;
const res = await fetch(url);
const data = await res.json(); 
let countQuote = parseInt(Math.random()*(data.length -1));
blockquote.textContent = data[countQuote].text;
figcaption.textContent = data[countQuote].author;
}

document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);


// Run
showDate();
showTime();
setBgGreet();
getName();
getFocus();


// Change Background Image
let currentHour = new Date().getHours();

function newImage() {
    if(currentHour >= 0 && currentHour < 6) {
        //Night
        document.body.style.backgroundImage = `url('assets/night/${dayBackground[currentHour]}.jpg')`;
    } else if(currentHour> 6 && currentHour < 12) {
        //Morning
        document.body.style.backgroundImage = `url('assets/morning/${dayBackground[currentHour]}.jpg')`;
    } else if(currentHour >= 12 && currentHour < 18) {
        //Afternoon
        document.body.style.backgroundImage = `url('assets/day/${dayBackground[currentHour]}.jpg')`;
    } else {
        // Evening
        document.body.style.backgroundImage = `url('assets/evening/${dayBackground[currentHour]}.jpg')`;
    }
    currentHour++;
    if (currentHour == 24) {
        currentHour = 0;
    }
};

document.querySelector(".image").addEventListener('click', newImage);
newImage();

// Show Weather
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=3eabe3da60a0bd4f4b5a5d7d3763dc4b&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
};

function setCity(event) {
    if (event.code === 'Enter') {
    getWeather();
    city.blur();
    }
};

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);

// Get City
function getCity() {
    if(localStorage.getItem('city') === null|| localStorage.getItem('city') === '') {
        city.textContent = 'Moscow';
    } else {
        city.textContent = localStorage.getItem('city');
    }
};

getCity();
