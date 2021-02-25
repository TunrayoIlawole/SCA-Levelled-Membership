const domElements = {
    display: document.querySelector('.display'),
    keys: document.querySelector('.calculator-keys')
}

// object to keep track of calculator values
const tracker = {
    displayValue: '0',
    firstOperand: null,
    operator: null,
    waitingForSecondOperand: false,
}

const inputDigit = (digit) => {
    // destructure the needed properties from the tracker object
    const { displayValue, waitingForSecondOperand } = tracker;

    // if a digit has been clicked on, update the display with the digit
    if (waitingForSecondOperand === true) {
        tracker.displayValue = digit;
        tracker.waitingForSecondOperand = false;
    } else {
        // if a digit is clicked after another digit, concatenate it to the first digit
        tracker.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }

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
        return;
    }

    // if the display value is a number, and the firstOperand property is null:
    if(firstOperand == null && !isNaN(inputValue)) {
        tracker.firstOperand = inputValue;
    } 
    // if an operator is clicked, calculate using the first operand, the operator and the digit that is clicked after it
    else if (operator) {
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


// reset the calculator to its original state
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
    // destructure the target property from the event object i.e event.target
    const { target } = event;

    // destructure the value from the target object i.e target.value
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
