var numbers = document.querySelectorAll('.number');
    operations = document.querySelectorAll('.operator');
    decimalBtn = document.getElementById('decimal');
    clearBtns = document.querySelectorAll('.clear-btn');
    resultBtn = document.getElementById('result');
    howWorkBtn = document.getElementById('howWorkBtn');

for (var i=0; i<numbers.length; i++) {
    var number = numbers[i];
    number.addEventListener('click', numberPress);
};

for (var i=0; i<operations.length; i++) {
    var operator = operations[i];
    operator.addEventListener('click', operation);
};

for (var i=0; i<clearBtns.length; i++) {
    var clearBtn = clearBtns[i];
    clearBtn.addEventListener('click', function (e) {
        clear(e.srcElement.id);
    });
};

decimalBtn.addEventListener('click', decimal);

resultBtn.addEventListener('click', result);

howWorkBtn.addEventListener('click', howWork);

function numberPress(){
    console.log('Клик по кнопке с номером!');
};

function operation(){
    console.log('Клик по кнопке с операцией!');
};

function clear(id){
    console.log('Клик по кнопке ' + id +'!');
};

function decimal(){
    console.log('Клик по кнопке с десятичной дробью!')
};

function howWork(){
    console.log('Клик по кнопке с КАК ЭТО РАБОТАЕТ!')
};

function result(){
    console.log('Клик по кнопке рузультата (равно)!')
}