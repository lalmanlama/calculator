(function(){
    let screen = document.querySelector('.screen');
    let buttons = document.querySelectorAll('.btn');
    let equal = document.querySelector('.btn-equal');
    let clear = document.querySelector('.btn-clear');
    let clearBack = document.querySelector(".btn-clearBack");
    
    let operandOne = '';
    let operandTwo = '';
    let operator = '';
    let q = 0;
    let  r = 0;

    buttons.forEach(function(button){
        button.addEventListener('click', function(e)
        {
           
        let value = button.value;

            if (isNaN(value))
            {
                if(value == '.' && operator == ''){
                    operandOne = operandOne.concat(value);
                    screen.value = screen.value + value;
                }
               else
                if(value == '.' && operator != '' )
                {
                    operandTwo = operandTwo.concat(value);
                    screen.value = screen.value + value;
                }
                if ( operator == '' && screen.value != "" && value != ".") {
                    operator = value;
                    screen.value =screen.value + value;
                } 
                else {
                    if(operator != '' && value != '.'){
                        processCalculation();
                        operator = value;
                        var length1 = screen.value.length;
                        screen.value = screen.value.slice(0,length1 - 1);
                        screen.value = screen.value + value;
                    }

                    if( operandOne != '' && operandTwo != '' && value != '.') {
                        processCalculation();
                        operator = value;
                        screen.value = screen.value + value;
                        operandTwo = '';
                    }
                }
                
            } 
            else {
                //screen.value = screen.value + value;
                if(operandOne == '') {
                    operandOne = operandOne + value;
                    //console.log(operandOne);
                } 
                else {
                    if ( operator == '' ) {    // if operator is blank append to operand1 else append to operand2
                        operandOne = operandOne + value;
                    } else {
                        operandTwo = operandTwo + value;
                    }
                }
                screen.value = screen.value + value;
            }

                //console.log( operandOne, operandTwo, operator );
         })
    });
    equal.addEventListener('click', function(e)
    {
        if(screen.value == ''){
            screen.value = '';
        }
        if(operandOne != '' && operandTwo != '')
        {
        processCalculation();
        }
        if(screen.value != '' && operandTwo == '')
        {
            screen.value = screen.value;
        }
    })


    clear.addEventListener('click', function()          //eventListener for C button
    {
        screen.value = "";
        operator = '';
        operandOne = '';
        operandTwo = '';
    })


    clearBack.addEventListener('click',function(){      //EventListener for AC button
        
        if(operandOne != '' && operator == ''){
            let length2 = screen.value.length;
            let newValue = screen.value.slice(0,length2 - 1);
            operandOne = newValue;
            screen.value = newValue;
        }
        if(operandOne != '' && operator != ''){
            let length3 = screen.value.length;
            let newValue = screen.value.slice(0,length3 - 1);

            if(operator == '+'){
            let newValue1 = newValue.split("+");
            operandTwo = newValue1[1];
            screen.value = newValue;
            }
            if(operator == '-')
            {
            let newValue1 = newValue.split("-");
            operandTwo = newValue1[1];
            screen.value = newValue;
            }
            if(operator == '*'){
                let newValue1 = newValue.split("*");
            operandTwo = newValue1[1];
            screen.value = newValue;
            }
            if(operator == '/'){
            let newValue1 = newValue.split("/");
            operandTwo = newValue1[1];
            screen.value = newValue;
            }
        }
    })

    function processCalculation() {

        let newOp1 = operandOne.split('.');

                if(newOp1[1] != undefined){
                     q = newOp1[1].length;}
                if(newOp1[1] == undefined){
                    q = 1;
                }
                operandOne = Number(operandOne);
                let newOp2 = operandTwo.split('.');
                if(newOp2[1] != undefined){
                    r = newOp2[1].length;}
                if(newOp2[1] == undefined){
                    r = 1;
                }
                operandTwo = Number(operandTwo);
       // operandOne = Number(operandOne);
       // operandTwo = Number(operandTwo);
        switch(operator) {
            case '+':
                if(q > r){
                    operandOne = operandOne + operandTwo;
                    operandOne = operandOne.toFixed(q);
                    screen.value = operandOne;}

                else{
                    operandOne = operandOne + operandTwo;
                    operandOne = operandOne.toFixed(r);
                    screen.value = operandOne;}  
                    break;
            case '-':
                if(q > r){
                    operandOne = operandOne - operandTwo;
                    operandOne = operandOne.toFixed(q);
                    screen.value = operandOne;}
    
                    else{
                    operandOne = operandOne - operandTwo;
                    operandOne = operandOne.toFixed(r);
                    screen.value = operandOne;}  
                    break;
            case '*':
                if(q > r){
                    operandOne = operandOne * operandTwo;
                    operandOne = operandOne.toFixed(q);
                    screen.value = operandOne;}
    
                    else{
                    operandOne = operandOne * operandTwo;
                    operandOne = operandOne.toFixed(r);
                    screen.value = operandOne;}  
                    break;
            default:
                if(q > r){
                    operandOne = operandOne / operandTwo;
                    operandOne = operandOne.toFixed(q);
                    screen.value = operandOne;}
    
                    else{
                    operandOne = operandOne / operandTwo;
                    operandOne = operandOne.toFixed(r);
                    screen.value = operandOne;}  
        }
        operandTwo = '';
        operator = '';

        //screen.value = operandOne;
    }


})();