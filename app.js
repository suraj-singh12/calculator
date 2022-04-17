let formInput = document.getElementsByTagName('input')[0];

// function for AC button
function eraseAll() {
    formInput.value = "";
    formInput.placeholder = '0';
}

// function for DEL button
function eraseLast() {
    let inputFormValue = formInput.value;
    // alert(inputFormValue);

    // if multiple digits are present, remove the last one
    if(inputFormValue.length > 1) {
        let lastChar = inputFormValue.charAt(inputFormValue.length - 1);
        // if last char is an empty space, that means an operator is there, 
        // so remove 3 chars (space, operator, space)
        if(lastChar == " ") {
            inputFormValue = inputFormValue.substring(0, inputFormValue.length -3);
        } else {
            // otherwise there would be a digit, so remove one char only (the last digit)
            inputFormValue = inputFormValue.substring(0, inputFormValue.length - 1);
        }
        formInput.value = inputFormValue;
    } else if(inputFormValue.length == 1) {
        // if only 1 digit is present, erase all
        eraseAll();
    }
    // if already nothing written, then do nothing
}

// function for NUMBER buttons
function insertDigit(e) {
    let digit = e.getAttribute('value');
    // alert(digit);
    // if input box is empty, just write this digit
    if(formInput.value == "") {
        formInput.value = digit;
    } else {  
        // append the value
        formInput.value = formInput.value + digit;
    }
}

// function for OPERATOR Buttons
function insertOperator(e) {
    let operator = e.getAttribute('value');
    let lastChar = formInput.value.charAt(formInput.value.length -1);
    // alert(lastChar);
    // if input box is empty, you can't use an operator without an operand
    if(formInput.value == "") {
        alert("Please enter an operand first!");
    } else if(lastChar == " ") {  
        // since after every operator we give a space, so space means last i/p was operator
        // so if already the last entered value was an operator, you cannot push an operator again
        // like 3455 + (now another operator after plus will be invalid)
        alert("Invalid input! \nCannot Enter an operator directly after another!");
    } else {
        // if last entered char is a decimal point like 234. 45. 
        // then remove the decimal, it doesn't make any sense in such manner
        if(lastChar == ".") {
            eraseLast();
        }
        formInput.value = formInput.value + " ";
        formInput.value = formInput.value + operator;
        formInput.value = formInput.value + " ";
    }
}


// function for inserting DECIMAL (point)
function insertDecimal() {
    let lastChar = formInput.value.charAt(formInput.value.length - 1);
    if(lastChar >= "0" && lastChar <= "9") {
        formInput.value = formInput.value + ".";
    } else {
        alert("Invalid insertion of decimal point!");
    }
}

// function to calculate final result
function calculateResult() {
    let inputData = formInput.value;
    // if enter is processed without any data, then nothing to do ! 
    if(inputData == "") {
        alert("Nothing to process !");
        return;
    } else if(inputData.charAt(inputData.length - 1) == " ") {
        /* since +, -, *, / are all binary operators, 
           so last value should be a digit if not so, then error !
        */
        alert("Please enter an operand after last operator!");
        return;
    }
    
    /* split the input from spaces; eg: 546 + 62 * 233.3 / 546
       [546, +, 62, *, 233.3, /, 546]
    */
    let fields = inputData.split(" ");
    // if there is no operator, only a number is there, then nothing to do
    if(fields.length == 1) {
        return;
    }

    // applying BODMAS to calculate result 
    for(let i = 0; i < fields.length; ++i) {
        if(fields[i] == "/") {
            // if the divisor is 0, show error
            if(fields[i+1] == "0") {
                eraseAll();
                formInput.placeholder = "Division By Zero Error!";
                return;
            }
            let tmpResult = parseFloat(fields[i-1]) / parseFloat(fields[i+1]);

            // remove the '/' operator and its operands
            fields.splice(i-1, 3, tmpResult);  // remove from i-1, and remove 3 items in line
            // continue the loop to find next division if any
        }
    }
    // alert(result);
    // alert(fields);
    for(let i = 0; i < fields.length; ++i) {
        if(fields[i] == "*") {
            let tmpResult = parseFloat(fields[i-1]) * parseFloat(fields[i+1]);
            
            // remove the '/' operator and its operands and insert the result
            fields.splice(i-1, 3, tmpResult);  
            // continue the loop to find next division if any
        }
    }

    for(let i = 0; i < fields.length; ++i) {
        if(fields[i] == "+") {
            let tmpResult = parseFloat(fields[i-1]) + parseFloat(fields[i+1]);

            // remove the '/' operator and its operands
            fields.splice(i-1, 3, tmpResult);  // remove from i-1, and remove 3 items in line
            // continue the loop to find next division if any
        }
    }

    for(let i = 0; i < fields.length; ++i) {
        if(fields[i] == "-") {
            let tmpResult = parseFloat(fields[i-1]) - parseFloat(fields[i+1]);

            // remove the '/' operator and its operands
            fields.splice(i-1, 3, tmpResult);  // remove from i-1, and remove 3 items in line
            // continue the loop to find next division if any
        }
    }
    //only one element will remain in fields[] array at last, and that would be final ans
    // alert(fields[0]);
    formInput.value = fields[0];
}

// ---------------------JS for improving dynamic design of calculator-----------------------------
let calculatorButtons = document.getElementsByClassName("calculator-button")[0];
function closeCalculator() {
    calculatorButtons.style.opacity = "0";
    let overlay = document.getElementById("calculator-on-off");
    overlay.style.display = "block";
    formInput.value = "";
    formInput.placeholder = "";
}

function launchCalculator() {
    calculatorButtons.style.opacity = "1";
    let overlay = document.getElementById("calculator-on-off");
    overlay.style.display = "none";
    formInput.placeholder = "0";
}

function minimizeCalculator() {
    calculatorButtons.style.display = "none";
    formInput.placeholder = "";
    formInput.value = "";
}

function maximizeCalculator() {
    calculatorButtons.style.display = "grid";
    formInput.placeholder = "0";
}