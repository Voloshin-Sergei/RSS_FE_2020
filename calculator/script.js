var numbers = document.querySelectorAll('.number'),
    operations = document.querySelectorAll('.operation'),
    decimalBtn = document.getElementById('decimal'),
    clearBtns = document.querySelectorAll('.clear-btn'),
    resultBtn = document.getElementById('result'),
    howWorkBtn = document.getElementById('howWorkBtn'),
    display = document.getElementById('display'),
    sqrtBtn = document.getElementById('sqrt'),
    minusPlusBtn = document.getElementById('minus-plus'),

    MemoryCurrentNumber = 0,
    MemoryNewNumber = false,
    MemoryPendingOperation = '';

for (var i=0; i<numbers.length; i++) {
    var number = numbers[i];
    number.addEventListener('click', function (e) {
        numberPress(e.target.textContent);
    });
};

for (var i=0; i<operations.length; i++) {
    var operationBtn = operations[i];
    operationBtn.addEventListener('click', function (e) {
        console.log();
        operation(e.target.textContent);
    });
};

for (var i=0; i<clearBtns.length; i++) {
    var clearBtn = clearBtns[i];
    clearBtn.addEventListener('click', function (e) {
        clear(e.srcElement.id);
    });
};

decimalBtn.addEventListener('click', decimal);

resultBtn.addEventListener('click', result);

sqrtBtn.addEventListener('click', sqrt);

minusPlusBtn.addEventListener('click',minusPlus);

function numberPress(number) {
    if (MemoryNewNumber) {
        display.value = number;
        MemoryNewNumber = false;
    } else {
        if (display.value === '0') {
            display.value = number;
        } else {
            display.value += number;
        };
    };

};

function operation(op) {
    var localOperationMemory = display.value;
    if (MemoryNewNumber && MemoryPendingOperation !== '=') {
        display.value = MemoryCurrentNumber;
    } else {
        MemoryNewNumber = true;
        if (MemoryPendingOperation === '+') {
            MemoryCurrentNumber += parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '-') {
            MemoryCurrentNumber -= parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '*') {
            MemoryCurrentNumber *= parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '/') {
            MemoryCurrentNumber /= parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === 'n^x') {
            MemoryCurrentNumber **= parseFloat(localOperationMemory);
        } else {
            MemoryCurrentNumber = parseFloat(localOperationMemory)
        };
        display.value = parseFloat(MemoryCurrentNumber.toFixed(15));
        MemoryPendingOperation = op;
    };
};

function decimal(argument) {
    var localDecimalMemory = display.value;

    if (MemoryNewNumber) {
        localDecimalMemory = '0.';
        MemoryNewNumber = false;
    } else {
        if (localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.';
        };
    };
    display.value = localDecimalMemory;
};

function clear(id){
    if (id === 'ce') {
        display.value = '0';
        MemoryNewNumber = true;
    } else if (id === 'c') {
        display.value = '0';
        MemoryNewNumber = true;
        MemoryCurrentNumber = 0;
        MemoryPendingOperation = '';
    };
};

function sqrt(argument) {
    var localSqrtMemory = display.value;

    if (localSqrtMemory >= 0) {
        localSqrtMemory = Math.sqrt(parseFloat(localSqrtMemory));
        
    } else {
        localSqrtMemory = 'ERROR';
    }
    display.value = localSqrtMemory;
    MemoryNewNumber = true;
};

function minusPlus(argument) {
    var localminusPlusMemory = display.value;
    localminusPlusMemory *= -1;
    display.value = localminusPlusMemory;
};