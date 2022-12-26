var screen = document.getElementById('calculatorScreen');


function equals(){
    updateValue();
}

function updateValue(){
    document.getElementById("valueTab").innerHTML = screen.value+ " = "+getNumbers();
    screen.focus();
}

function getNumbers(){
    if(screen.value == '') return 0;
    let myArr = screen.value.split(" ");
    let result;
    for (let i = 1; i < myArr.length; i++) {
        let number = parseFloat(myArr[i+1]);
        if(result == null)
                result = myArr[i-1];
        if(myArr[i]=="*"){ 
            result *= number;
        }
        else if(myArr[i]=="/"){ 
            result /= number;
        }
    }
    for (let i = 0; i < myArr.length; i++) {
        let number = parseFloat(myArr[i]);
        if(myArr[i+1]=="+") result += number;
        else if(myArr[i+1]=="-") result -= number;
    }
   return result;
}

function updateCalculatorScreen(display){
    screen.value += display;
    console.log(screen.value);
}

function clearScreen(){
    screen.value = '';
    updateValue();
}

function operation(operation){
    updateCalculatorScreen(" "+operation+" ");
    screen.focus();
}

// ------ listeners

function onlyNumberKey(evt) {
    // Only ASCII character in that range allowed
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode;
    if (ASCIICode > 31 && (ASCIICode < 46 || ASCIICode > 57))
        return false;
    return true;
}

document.addEventListener("keydown", function onPress(event) { 
    //alert('key = '+event.key)
    switch (event.key) {
        case "=":
        case "Enter":
            updateValue();
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            let myArr = screen.value.split(''); 
            myArr = myArr.filter(function(item) { // removing the empty space 
                return item != " ";
            });
            let lastOperator = myArr[myArr.length-1];
            if(["+","-","*","/"].includes(lastOperator)) return;
            operation(event.key);
    }
    changeBtnColor(event);
});

function changeBtnColor(event){
    var allInputs = document.getElementsByTagName("input");
    for (let element of allInputs) {
        if(element.value == event.key){
            let oldColor = '#F2F2F2';
            element.style.backgroundColor = "lightblue";
            if(element.value == '=') oldColor = '#81C784';
            else if(element.value == 'Clear') oldColor = '#F50258';
            setTimeout(function () { element.style.backgroundColor = oldColor}, 500);
        }
    }
}


