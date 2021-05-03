function add(num1, num2) {
    return num1 + num2;
}

function substract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    switch (operator) {
        case '+':
            return add(num1, num2);
            
        case '-':
            return substract(num1, num2);
            
        case '*':
            return multiply(num1, num2);
            
        case '/':
            return divide(num1, num2);
            
    } 
}

function write(amount) {
    //select the screen
    let screen = document.querySelector('#calculator-screen');
    //set the text content equals to amount that was passed into the function
    screen.textContent = amount;
}


function ToDisplayBuffer (e) {
    //check for decimal
    if (e.target.textContent === '.'){
        if (displayBuffer.includes('.')) {
            return;
        }
    } 
    displayBuffer += e.target.textContent;
    write(displayBuffer);
}

function storeBufferInNums() {
    if (num1 === undefined) { //if there is no value in num1
        num1 = displayBuffer; //store the buffer in there
    } else if (num2 === undefined) { //if there was a value in num1 but not num2
        num2 = displayBuffer; //store the buffer there
    }
    displayBuffer = '';      //reset the displayBuffer
}

function calcAndDisplay() {
    //store the return value of the operate function in num1
    num1 = operate(operator, num1, num2)
    //display the value of num1
    write(num1);
    //reset num 2
    num2 = undefined;
    //reset operator
    operator = '';
}

function clickOperator(e) {
    //is there a displayBuffer?
    if (displayBuffer !== '') storeBufferInNums();
    //is there a pending operator, a num1 and a num2?
    if (operator !== '' && num1 && num2) calcAndDisplay();
    const operatorClicked = e.target.textContent;
    operator = operatorClicked;
}

function clickEqual() {
    if (displayBuffer !== '') storeBufferInNums();
    calcAndDisplay();
}

function clickClear() {
    displayBuffer = '';
    num1 = undefined;
    num2 = undefined;
    operator = '';
    write(0);
}

function clickNegativeBtn() {
    if (displayBuffer.includes('-')) {
        displayBuffer = displayBuffer.replace('-', '');
    } else if (!displayBuffer.includes('-')) {
        displayBuffer = "-" + displayBuffer;
    }
    write(displayBuffer);
}

function pressedKey(e) {
    let keyPressed = e.key;
    numericalKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    operatorKeys = ['/', '*', '-', '+']
    
    if (numericalKeys.includes(keyPressed)) { //numerical keys
        displayBuffer += keyPressed;
        write(displayBuffer);
    } else if (keyPressed === '.') { //decimal key
        if (displayBuffer.includes('.')) {
            return;
        } else {
            displayBuffer += keyPressed;
            write(displayBuffer);
        }
    }else if (operatorKeys.includes(keyPressed)) { //operator key
        //is there a displayBuffer?
        if (displayBuffer !== '') storeBufferInNums();
        //is there a pending operator, a num1 and a num2?
        if (operator !== '' && num1 && num2) calcAndDisplay();
        const operatorClicked = keyPressed;
        operator = operatorClicked;
    } else if (keyPressed === 'Enter') { //equal key
        clickEqual();
    } else if (keyPressed === 'Clear') {
        clickClear();
    } else {
        return;
    }
}

//global varibles
let displayBuffer = ''; //''
let num1; //1
let num2; //4
let operator = ''; // +

//add event listeners on all the numeric buttons
const numberButtons = document.querySelectorAll('.number-button');
numberButtons.forEach(button => button.addEventListener('click', ToDisplayBuffer));

//add event listeners on the operator buttons
const operatorButtons = document.querySelectorAll('.operator-btn');
operatorButtons.forEach(button => button.addEventListener('click', clickOperator))

//add event listener on the equal sign
const equalBtn = document.querySelector('#equal-btn');
equalBtn.onclick = clickEqual;

//add event listener on the clear button
const clearBtn = document.querySelector('#clear-btn');
clearBtn.onclick = clickClear;

//add event listener on the negative sign
const negativeBtn = document.querySelector('#positive-negative-btn');
negativeBtn.onclick = clickNegativeBtn;

//add event listener on the keys
document.addEventListener('keydown', pressedKey);