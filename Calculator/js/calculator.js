(function(win, doc){
    'use strict';
    /*
    Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
    As regras são:
    - Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
    diretamente;
    - O input deve iniciar com valor zero;
    - Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
    - Deve haver 4 botões para as operações principais: soma (+), subtração(-),
    multiplicação(x) e divisão(÷);
    - Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
    que irá limpar o input, deixando-o com valor 0;
    - A cada número pressionado, o input deve atualizar concatenando cada valor
    digitado, como em uma calculadora real;
    - Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
    operação no input. Se o último caractere no input já for um símbolo de alguma
    operação, esse caractere deve ser substituído pelo último pressionado.
    Exemplo:
    - Se o input tem os valores: "1+2+", e for pressionado o botão de
    multiplicação (x), então no input deve aparecer "1+2x".
    - Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
    input;
    - Ao pressionar o botão "CE", o input deve ficar zerado.
    */

    //elements

    var $input = doc.querySelector('[data-js="input"]');
    var $inputButtons = doc.querySelectorAll('[data-js="inputButtons"]');
    var $ceButton = doc.querySelector('[data-js="ce"]');
    var $resultButton = doc.querySelector('[data-js="resultButton"]');

    //regex

    var regexInput = /[\+\-x\/]$/;
    var regexCalc = /(\d+(?:\.\d+)?)([\+\-])(\d+(?:\.\d+)?)/;

    //events

    $inputButtons.forEach(function(inputButton){
        inputButton.addEventListener('click', function(event){
            event.preventDefault();
            var teste = /^0$/.test($input.value) && /[^\.]/.test(inputButton.value);
            var teste2 = regexInput.test($input.value) && regexInput.test(inputButton.value);
            (teste || teste2) ?
                 $input.value = $input.value.replace(/^0/.test($input.value) ? '0' : regexInput, inputButton.value) : 
                 $input.value += inputButton.value;
        }, false);
    });

    $ceButton.addEventListener('click', function(event){
        event.preventDefault();
        $input.value = '0';
    }, false);

    $resultButton.addEventListener('click', function(event){
        event.preventDefault();
        $input.value = calcular();
    }, false);


    // calculator

    var operations = {
        'x' : mult,
        '+' : sum,
        '-' : sub,
        '/' : div
    }

    function sum(x, y){
        return +x + +y;
    }

    function sub(x, y){
        return +x - +y;
    }

    function mult(x, y){
        return +x * +y;
    }

    function div(x, y){
        return +x / +y;
    }


    function calcular(){
        var result = $input.value;
        var regexPrioritary = /(\d+(?:\.\d+)?)([x\/])(\d+(?:\.\d+)?)/;
        while (regexPrioritary.test(result)){
            result = result.replace(regexPrioritary, function operation(captura, numb1, op, numb2){
                return operations[op](numb1, numb2);
            });
        }
        while (regexCalc.test(result)){
            result = result.replace(regexCalc, function operation(captura, numb1, op, numb2){
                return operations[op](numb1, numb2);
            });
        }
        return result;
    };



})(window, document);