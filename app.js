const screen = document.querySelector('.screen'),
    buttons = document.querySelectorAll('.btn'),
    equal = document.querySelector('.btn-equal'),
    clear = document.querySelector('.btn-clear'),
    clearBack = document.querySelector(".btn-clearBack");

    let operandOne = '',
        operandTwo = '',
        operator = '',
        q = 0,
        r = 0;

    const calculator = {
        // get input from each button
        getInputFromEachButton : function() {
            buttons.forEach(function(button) {
                button.addEventListener('click', function(e) {   //evenlistener for each buttons
                let value = button.value;
                    if (isNaN(value)) {  //if value is other than number
                        if (value == '.' && operator == ''){
                            operandOne = operandOne.concat(value);
                            screen.value = screen.value + value;
                        } else if ( value == '.' && operator != '' ) {
                            operandTwo = operandTwo.concat(value);
                            screen.value = screen.value + value;
                        }
                        else if ( operator == '' && screen.value != "" && value != ".") {
                            operator = value;
                            screen.value =screen.value + value;
                        } else if (operator != '' && value != '.') {
                               if (operandOne != '' && operandTwo != '') {//result is calculate & saved to operandOne
                                    calculator.checkDecimal();
                                    calculator.processCalculation();
                                    operator = value;
                                    screen.value = screen.value + value;
                                    operandTwo = '';
                                } else {    // if operandTwo is empty then overwrite the operator
                                    operator = value;
                                    var length1 = screen.value.length;
                                    screen.value = screen.value.slice(0,length1 - 1);
                                    screen.value = screen.value + value;
                                }
                            }
                    } else {
                        if(operandOne == '') { // if value is number and operandOne is empty then add to operandOne
                            operandOne = operandOne + value;
                        } 
                        else {
                            if ( operator == '' ) { 
                                operandOne = operandOne + value;
                            } else {  //if operandOne and operator are not empty then add to operandTwo
                                operandTwo = operandTwo + value;
                            }
                        }
                        screen.value = screen.value + value;//print value on screen
                    } 
                 })
            });
        }, 
        getEquals : function () {
                if(screen.value == '') {   // check if screen.value is empty
                    screen.value = '';
                } else if (operandOne != '' && operandTwo != '') {
                    this.checkDecimal(); //checkDecimal is invoked
                    this.processCalculation(); //procssCalculation is invoked
                }
                else if (screen.value != '' && operandTwo == '') {
                    screen.value = screen.value;
                }
        },
        checkDecimal : function () {
            let op1 = operandOne;
            abc = Number(op1);
            if (!Number.isInteger(op1)) { //check if op1 is integer or not
                let newOp1 = operandOne.split('.'); //operandOne is split by '.'
                if (newOp1[1] != undefined) {
                    q = newOp1[1].ldefinength;   //length of the decimal value after '.'
                }  
                if (newOp1[1] == undefined) {
                    q = 0;  //default decimal value
                }
            }
            let op2 = operandTwo;
            abc = Number(op2);
            if (!Number.isInteger(op2)) {
                let newOp2 = operandTwo.split('.');   //operandTwo is split by '.'
                if (newOp2[1] != undefined) {
                    r = newOp2[1].length;
                } if (newOp2[1] == undefined) {
                    r = 0;
                }
            }
        },
        processCalculation : function () {
            operandOne = Number(operandOne);
            operandTwo = Number(operandTwo);
            switch (operator) {
                case '+' :
                    if (q > r) {
                        operandOne = operandOne + operandTwo;
                        operandOne = operandOne.toFixed(q);
                        screen.value = operandOne;
                    } else {
                        operandOne = operandOne + operandTwo;
                        operandOne = operandOne.toFixed(r);
                        screen.value = operandOne;
                    } break;
                case '-' :
                    if (q > r) {
                        operandOne = operandOne - operandTwo;
                        operandOne = operandOne.toFixed(q);
                        screen.value = operandOne;
                    } else {
                        operandOne = operandOne - operandTwo;
                        operandOne = operandOne.toFixed(r);
                        screen.value = operandOne;
                    } break;
                case '*' :
                    if (q > r) {
                        operandOne = operandOne * operandTwo;
                        operandOne = operandOne.toFixed(q);
                        screen.value = operandOne;
                    } else {
                        operandOne = operandOne * operandTwo;
                        operandOne = operandOne.toFixed(r);
                        screen.value = operandOne;
                    } break;
                default:
                        operandOne = operandOne / operandTwo;
                        operandOne = operandOne;
                        screen.value = operandOne;
            }
           operandTwo = '';
           operator = '';
        },
        clearScreen : function () {
                screen.value = "",
                operator = '',
                operandOne = '',
                operandTwo = '';
          },
        clearBackOnePosition : function () {
                if (operandOne != '' && operator == '') {   //update operandOne
                    let length = screen.value.length,
                    newValue = screen.value.slice(0,length - 1);
                    operandOne = newValue;
                    screen.value = newValue;
                } else if (operandOne != '' && operator != '' && operandTwo != '') {    //update operandTwo
                    let length = screen.value.length,
                    newValue = screen.value.slice(0,length - 1);
                    if (operator == '+') {  
                        let newValue1 = newValue.split("+");
                        operandTwo = newValue1[1];
                        screen.value = newValue;
                    } else if (operator == '-') {
                        let newValue1 = newValue.split("-");
                        operandTwo = newValue1[1];
                        screen.value = newValue;
                    } else if (operator == '*') {
                        let newValue1 = newValue.split("*");
                        operandTwo = newValue1[1];
                        screen.value = newValue;
                    } else if (operator == '/') {
                        let newValue1 = newValue.split("/");
                        operandTwo = newValue1[1];
                        screen.value = newValue;
                    }
                }
        }
    };

    document.addEventListener('DOMContentLoaded',function() {
        calculator.getInputFromEachButton();
        equal.addEventListener('click', function(e) {
            calculator.getEquals();
        });
        clear.addEventListener('click', function() {         //eventListener for C button
           calculator.clearScreen();
        });
        clearBack.addEventListener('click',function() {      //EventListener for AC button
            calculator.clearBackOnePosition();
        });
    });