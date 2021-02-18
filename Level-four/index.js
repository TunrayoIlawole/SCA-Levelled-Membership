const domElements = {
    display: document.querySelector('.display'),
    keys: document.querySelector('.calculator-keys')
}

const tracker = {
    displayValue: '0',
    firstOperand: null,
    operator: null,
    waitingForSecondOperand: false,
}

const inputDigit = (digit) => {
    const { displayValue, waitingForSecondOperand } = tracker;

    if (waitingForSecondOperand === true) {
        tracker.displayValue = digit;
        tracker.waitingForSecondOperand = false;
    } else {
        tracker.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }

    console.log(tracker);
};


const inputDecimal = (dot) => {
    if (tracker.waitingForSecondOperand === true) {
        tracker.displayValue = "0. "
        tracker.waitingForSecondOperand = false;
    }
    if (!tracker.displayValue.includes(dot)) {
        tracker.displayValue += dot;
    }
};

const handleOperator = (nextOperator) => {
    const { firstOperand, displayValue, operator } = tracker;

    const inputValue = parseFloat(displayValue);

    if (operator && tracker.waitingForSecondOperand) {
        tracker.operator = nextOperator;
        console.log(tracker);
        return;
    }

    if(firstOperand == null && !isNaN(inputValue)) {
        tracker.firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        tracker.displayValue = `${parseFloat(result.toFixed(7))}`;
        tracker.firstOperand = result;
    }

    tracker.waitingForSecondOperand = true;
    tracker.operator = nextOperator;

    console.log(tracker);
};

const calculate = (first, second, operator) => {
    if (operator === "+") {
        return first + second;
    } else if (operator === "-") {
        return first - second;
    } else if (operator === "*") {
        return first * second;
    } else if (operator === "/") {
        return first / second;
    }

    return second;
}

const resetCalc = () => {
    tracker.displayValue = '0';
    tracker.firstOperand = null;
    tracker.waitingForSecondOperand = false;
    tracker.operator = null;
    console.log(tracker);
}


// Create a function to update the calculator display screen
const updateDisplay = () => {
    const display = domElements.display;
    
    display.value = tracker.displayValue;
};
updateDisplay();

domElements.keys.addEventListener('click', (event) => {
    const { target } = event;
    const { value } = target

    if (!target.matches('button')) {
        return;
    }

    switch(value) {
        case "+":
        case "-":
        case "*":
        case "/":
        case "=":
            handleOperator(value);
            break;
        case ".":
            inputDecimal(value);
            break;
        case "all-clear":
            resetCalc();
            break;
        default:
            if (Number.isInteger(parseFloat(value))) {
                inputDigit(value);
            }
    }

    updateDisplay();
});
