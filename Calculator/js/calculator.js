(function(win, doc){
    'use strict';

    //elements

    var $input = doc.querySelector('[data-js="input"]');
    var $inputButtons = doc.querySelectorAll('[data-js="inputButtons"]');
    var $ceButton = doc.querySelector('[data-js="ce"]');
    var $resultButton = doc.querySelector('[data-js="resultButton"]');

    //regex

    var regexReplaceOp = /[\+\-x\/\=]$/;
    var regexReplaceZero = /^0$/;
    var isNotAPointRegex = /[^\.]/;
    var regexPrioritary = /(\d+(?:\.\d+)?)([x\/])(\d+(?:\.\d+)?)/;
    var regexFinalCalc = /(\d+(?:\.\d+)?)([\+\-])(\d+(?:\.\d+)?)/;

    //events

    $inputButtons.forEach(function(inputButton){
        inputButton.addEventListener('click', function(event){
            deleteLast(inputButton);
            concatValue(inputButton);
        }, false);
    });

    $ceButton.addEventListener('click', clearInput, false);
    $resultButton.addEventListener('click', showResult, false);

    // button functions

    function clearInput(){
        $input.value = '0';
    }

    function showResult(){
        deleteLast($resultButton);
        $input.value = calcular();
    }

    // calculator

    var operations = {
        'x' : function mult(x, y) { return +x * +y; },
        '+' : function sum(x, y) { return +x + +y; },
        '-' : function sub(x, y) { return +x - +y; },
        '/' : function div(x, y) { return +x / +y; }
    }

    function calcular(){
        return sumAndSub(multAndDiv($input.value));
    };

    function multAndDiv(input){
        while (regexPrioritary.test(input)){
            input = input.replace(regexPrioritary, function operation(captura, numb1, op, numb2){
                return operations[op](numb1, numb2);
            });
        }
        return input;
    }

    function sumAndSub(input){
        while (regexFinalCalc.test(input)){
            input = input.replace(regexFinalCalc, function operation(captura, numb1, op, numb2){
                return operations[op](numb1, numb2);
            });
        }
        return input;
    }

    // input entry

    function deleteLast(button){
        if (isLastAnOperation(button) || isInputOnlyZero(button))
            $input.value = $input.value.slice(0, $input.value.length-1);
    }

    function concatValue(button){
        $input.value += button.value;
    }

    function isLastAnOperation(button){
        return regexReplaceOp.test($input.value) && regexReplaceOp.test(button.value);
    }

    function isInputOnlyZero(button){
        return regexReplaceZero.test($input.value) && isNotAPointRegex.test(button.value)
    }

})(window, document);