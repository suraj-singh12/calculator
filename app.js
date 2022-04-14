const calculatorButtons = document.querySelector(".calculator-button");

const calculatorForm = document.querySelector(".calculator");
const formInput = document.querySelector(".calculator input");
// const formInputTextSize = getComputedStyle(formInput).fontSize;

function removeInvalidZeroBeforeDigit(expression) {
    let expressionLength = expression.length;
    if (!isValidWithZero(expression)) {
        formInput.value = removeLastCharacter(expression);
    }
}

// Function To Check For The Validity Of Zero 
function isValidWithZero(expression) {
    let expressionLength = expression.length;
    if (expressionLength == 0) return true;
    while (expressionLength-- > 0) {

        //decimal means its valid we can place zero
        if (expression[expressionLength] == '.') {
            return true;
        }

        //if we find not including zero we can place zero
        if (expression[expressionLength] > '0' && expression[expressionLength] <= '9') {
            return true;
        }

        //operators  2 case arises
        if (isOperator(expression[expressionLength])) {
            //1st case we didnt find number and decima means there will be zero here we cant place zero here invalid
            if (expressionLength < expression.length - 1)
                break;

            //2nd case there is no zero previously present so only operator is present we can place zero here
            return true;
        }
    }
    return false;
}

// Removing The Last Character OF The Expression 
function removeLastCharacter(formValue) {
    const lengthOfValueOfInput = formValue.length;
    const modifiedValue = formValue.slice(0, -1);
    formInput.value = modifiedValue;
    return formInput.value;
}

// Checking In The Expression That Already An Operator Exists Or Not
function isOperator(expression) {
    const lastCharacter = expression.slice(-1);
    switch (lastCharacter) {
        case "+": return true;
        case "-": return true;
        case "/": return true;
        case "*": return true;
        default: return false;
    }
}

/*Placing The Operator In The Expression Without Any Violation Of Mathematical Expression*/
function placingOperator(operatorValue) {
    let expression = formInput.value;

    //When The Epression String Is Empty Then We Have To Place + And - Only
    if (expression.length == 0) {
        if (operatorValue == '*' || operatorValue == '/') {
            formInput.value = "NaN";
            return;
        }
        formInput.value = expression + operatorValue;
        return;
    }

    //When There Is No Operator In String Then We Have To Directly Place And Operator
    if (!isOperator(expression)) {
        formInput.value = expression + operatorValue;
        return;
    }

    //When We Reapply Operator So We Avoid Placing The First Operator / * 
    if (expression.length == 1) {
        if (operatorValue == '*' || operatorValue == '/') {
            formInput.value = "NaN";
            return;
        }
    }

    // Just Place The Operator By Removing The Previous Operator
    let modifiedValue = removeLastCharacter(expression) + operatorValue;
    formInput.value = modifiedValue;
}

//Checking Validity OF expression before evaluating
function isExpressionCorrect(expression) {

    // if there is operator at last index then invalid
    if (isOperator(expression)) {
        return false;
    }
    return true;
}

// Finding Decimal Present In The Expression Of Number Previously Or Not
function isDecimal(expression) {
    let expressionLength = expression.length;
    while (expressionLength-- > 0) {
        if (expression[expressionLength] == '.') {
            return true;
        }
        if (isOperator(expression[expressionLength])) {
            break;
        }
    }
    return false;
}

function placingDecimal(expression) {
    if (isDecimal(expression)) {
        return;
    }
    if (expression.length == 0 || isOperator(expression))
        expression += "0.";
    else
        expression += ".";

    formInput.value = expression;
}

// ---------------------------------------------------------------
// All Button Events For Operation Of Calculator
calculatorButtons.addEventListener("click", (e) => {
    /* calculatorButtons.addEventListener("click", function(e) {

    });
    */
    //Adoid Reloading Of The Webpage While Click On The Btton
    e.preventDefault();
    let targetButton = e.target.classList;
    let expression = formInput.value;
    // resizeExpressionLength(expression);
    // if (formInput.value === "NaN" || formInput.value === "Infinity") {
    //     formInput.value = "";
    // }

    //Numeric Buttons
    if (targetButton.contains("num-btn")) {
        if (e.target.value == '0') {
            if (!isValidWithZero(expression))
                return;
        }
        if (expression.length != 0) {
            removeInvalidZeroBeforeDigit(expression);
        }
        formInput.value += e.target.value;
        return
    }

    //Del Button For Removing The Last Digit
    if (targetButton.contains("rem-digit-btn")) {
        removeLastCharacter(expression);
        return;
    }

    //AC For Clearing The Input Screen
    if (targetButton.contains("clear-btn")) {
        formInput.value = "";
        return;
    }

    //Operation Button Like + - / *
    if (targetButton.contains("oper-btn")) {
        placingOperator(e.target.value);
        return;
    }

    //Decimal Button
    if (targetButton.contains("decimal-btn")) {
        placingDecimal(expression);
        return;
    }

    //Calc Button 
    if (targetButton.contains("calc-btn")) {
        if (expression.length === 0) return;
        if (!isExpressionCorrect(expression)) {
            formInput.value = "NaN";
            return;
        }
        formInput.value = +eval(expression).toFixed(6);
        return;
    }
});


const body = document.querySelector("body");

body.addEventListener("keypress", (e) => {
    let expression = formInput.value;
    const targetKey = e.key;
    // resizeExpressionLength(expression);
    if (expression === "NaN" || expression === "Infinity") {
        formInput.value = "";
    }
    if (Number.isInteger(+targetKey)) {
        if (targetKey === 0) {
            if (!isValidWithZero(expression))
                return;
        }
        if (expression.length != 0) {
            removeInvalidZeroBeforeDigit(expression);
        }
        formInput.value += targetKey;
        return;
    }
    if (isOperator(targetKey)) {
        placingOperator(targetKey);
        return;
    }
    //Decimal Button
    if (targetKey === ".") {
        placingDecimal(expression);
        return;
    }

    //Calc Button 
    if (targetKey === "=") {
        if (expression.length === 0) return;
        if (!isExpressionCorrect(expression)) {
            formInput.value = "NaN";
            return;
        }
        formInput.value = +eval(expression).toFixed(6);
        return;
    }
});

body.addEventListener("keydown", (e) => {
    const targetKey = e.key;
    let expression = formInput.value;
    if (targetKey === "Backspace") {
        removeLastCharacter(expression);
        return;
    }
});
