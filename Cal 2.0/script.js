// script.js
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

let currentInput = '0';
let operator = null;
let previousInput = null;

function updateDisplay() {
  display.textContent = currentInput;
}

function resetCalculator() {
  currentInput = '0';
  operator = null;
  previousInput = null;
  updateDisplay();
}

function appendNumber(num) {
  if (currentInput === '0' && num !== '.') {
    currentInput = num;
  } else if (num === '.' && currentInput.includes('.')) {
    return; // one decimal only
  } else {
    currentInput += num;
  }
  updateDisplay();
}

function setOperator(op) {
  if (previousInput !== null && operator) {
    compute();
  }
  operator = op;
  previousInput = currentInput;
  currentInput = '0';
}

function compute() {
  let prev = parseFloat(previousInput);
  let current = parseFloat(currentInput);
  let result = 0;
  switch (operator) {
    case 'add': result = prev + current; break;
    case 'subtract': result = prev - current; break;
    case 'multiply': result = prev * current; break;
    case 'divide': result = prev / current; break;
    default: return;
  }
  currentInput = String(result);
  operator = null;
  previousInput = null;
  updateDisplay();
}

function backspace() {
  if (currentInput.length === 1) {
    currentInput = '0';
  } else {
    currentInput = currentInput.slice(0, -1);
  }
  updateDisplay();
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.hasAttribute('data-number')) {
      appendNumber(button.getAttribute('data-number'));
    } else if (button.getAttribute('data-action')) {
      switch (button.getAttribute('data-action')) {
        case 'clear': resetCalculator(); break;
        case 'add': setOperator('add'); break;
        case 'subtract': setOperator('subtract'); break;
        case 'multiply': setOperator('multiply'); break;
        case 'divide': setOperator('divide'); break;
        case 'equals': compute(); break;
        case 'decimal': appendNumber('.'); break;
        case 'backspace': backspace(); break;
      }
    }
  });
});

// Initialize
updateDisplay();
