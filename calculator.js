var isOn = false;

function powerOn() {
    isOn = true;
    document.getElementById("display").value = "ON";
    document.getElementById("display").disabled = false;    
    var buttons = document.querySelectorAll("button");
     buttons.foreach(buttons => {
        if (buttons.id !== "onBtn") {
            buttons.disabled = false
        }
     });
}

function powerOff() {
    isOn = false;
    document.getElementById("display").value = "OFF";
    document.getElementById("display").disabled = true;
    var buttons = document.querySelectorAll("button,select");
    buttons.forEach(button => {
        button.disabled = true;
    });
}

function insertNumber(num) {
    if (isOn) {
        document.getElementById("display").value += num;
    }
}

// function undo() {
//     if(isOn) {
//         document.getElementById("display").value = lastValue
//     }
// }

var currentInput = " ";
var currentOperation = " ";
var previousInput = " ";

function fun(number) {
    currentInput = currentInput + number;
    document.getElementById('display').value = `${previousInput}${currentOperation}${currentInput}`;
    if (num === "." && display.value.includes(".")) {
        return;
    }
    display.value += number;
    console.log(clearDisplay())
}

function operationSign(operation) {
    if (currentInput === '') 
        return;
    else if (previousInput !== '') {
        calculate();
    }

    currentOperation = operation;
    previousInput = currentInput;
    currentInput = '';
    
    document.getElementById('display').value = `${previousInput}${currentOperation}`;
}

function calculate() {
    if (previousInput === '' || currentInput === '') 
        return;

    var result;
    var prev = parseFloat(previousInput);
    var current = parseFloat(currentInput);

    switch (currentOperation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '**':
                result = prev * current;
                break;
        case 'pow':
                result = Math.pow(prev,current);
                break;
        case '/':
            if (current === 0) {
                alert("Cannot divide by zero");
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    // Update display after calculation
    document.getElementById('display').value = result;
    
    // Reset values for next calculation
    previousInput = " ";
    currentInput = " ";
    currentOperation = '';
}

// ShiftMode
var shiftMode = false;

// Math/Trigonometic Functions
function math(trigonometic) {   
    var result = 0;
    var current = parseFloat(currentInput);

    switch (trigonometic) {
        case 'log':
            result = Math.log(current);
            break;
        case 'sin':
            result = Math.sin(current);
            break;
        case 'cos':
            result = Math.cos(current);
            break;
        case 'tan':
                result = Math.tan(current);
                break;
        case 'sqrt':
                result = Math.sqrt(current);
                break;
        default:
            result = "Error";
            break;
    }

    // Update display
    document.getElementById('display').value = result;
}

// shift
function toggleShift() {
    shiftMode = !shiftMode;
    updataButtonLabels();
}

function updataButtonLabels() {
    document.getElementById("sin").innerText = shiftMode ? "sin^-1" : "sin";
    document.getElementById("cos").innerText = shiftMode ? "cos^-1" : "cos";
    document.getElementById("tan").innerText = shiftMode ? "tan^-1" : "tan";
    document.getElementById("log").innerText = shiftMode ? "log^-1" : "log";
}

function clearDisplay() {
    currentInput = " "
    previousInput = " "
    currentOperation = " "
    document.getElementById("display").value = " ";
}

// var lastOperation = "";
// var lastPrev = "";
// var lastCurrent = "";
// function calc() {
//     if(!isOn)
//         return;
//     var result;
//     var prev = parseFloat(previousInput);
//     var current = parseFloat(currentInput)
    
//     lastPrev = prev;
//     lastCurrent = current;
//     lastOperation = currentOperation;

//     switch(currentOperation) {
//         case '+':
//             result = prev + current;
//             break;
//         case '-':
//             result = prev - current;
//             break;
//         case '*':
//             result = prev * current;
//             break;
//         case '**':
//                 result = prev * current;
//                 break;
//         case 'pow':
//                 result = Math.pow(prev,current);
//                 break;
//         case '/':
//             if (current === 0) {
//                 alert("Cannot divide by zero");
//                 return;
//             }
//             result = prev / current;
//             break;
//         default:
//             return;
//     }

//     document.getElementById("display").value = result;
//     previousInput = result;
//     currentInput = "";

//     function replay() {
//         if(isOn && lastOperation) {
//             previousInput = lastPrev;
//             currentInput = lastCurrent;
//             currentOperation = lastOperation;
//             calc()
//         }
//     }
// }