// DOM Elements
const time = document.getElementById('time'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    focus = document.getElementById('focus'),
    date = document.getElementById('date');

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
        document.body.style.backgroundImage = "url('assets/night/09.jpg')";
        greeting.textContent = 'Good Night,';
        document.body.style.color = 'white';
    } else if(hour > 6 && hour < 12) {
        //Morning
        document.body.style.backgroundImage = "url('assets/morning/06.jpg')";
        greeting.textContent = 'Good Morning,';
    } else if(hour >= 12 && hour < 18) {
        //Afternoon
        document.body.style.backgroundImage = "url('assets/day/06.jpg')";
        greeting.textContent = 'Good Afternoon,';
    } else {
        // Evening
        document.body.style.backgroundImage = "url('assets/evening/07.jpg')";
        greeting.textContent = 'Good Evening,';
        document.body.style.color = 'white';
    }
};

// Get Name
function getName() {
    if(localStorage.getItem('name') === null) {
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
    if(localStorage.getItem('focus') === null) {
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

function randomQuote() {
    let random = quotes[Math.floor(Math.random() * quotes.length)];
    quotation.innerText = `“${random.text}.”`;
    author.innerText = random.author;
}
document.querySelector("button").addEventListener('click', randomQuote);

// Run
showDate();
showTime();
setBgGreet();
getName();
getFocus();
randomQuote();
