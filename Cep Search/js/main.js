(function(win, doc){
    'use strict';

    var ajax = new XMLHttpRequest();

    var $cep = doc.querySelector('[data-js="entry"]');
    var $button = doc.querySelector('[data-js="submit"]');
    var $inputCep = doc.querySelector('[data-js="cep"]');
    var $inputEstado = doc.querySelector('[data-js="estado"]');
    var $inputCidade = doc.querySelector('[data-js="cidade"]');
    var $inputBairro = doc.querySelector('[data-js="bairro"]');
    var $inputLogradouro = doc.querySelector('[data-js="logradouro"]');
    var $showStatus = doc.querySelector('[data-js="status"]');
    var $allFields = doc.querySelectorAll('input');

    $button.addEventListener('click', function(event){
        event.preventDefault();
        try{
            showAdress();
        }
        catch(e){
            $showStatus.id = 'red';
            $showStatus.innerHTML = "Insira um CEP válido!";
            clearFields();
        }
    }, false);

    function showAdress(){
        var cep = filter(cleanCep($cep.value));
        ajax.open('GET', 'https://viacep.com.br/ws/' + cep + '/json/');
        ajax.send();
        ajax.addEventListener('readystatechange', function(){
            $showStatus.id = 'black';
            $showStatus.innerHTML = "Carregando";
            if (requestOk()){
                try{
                    var responseAdress = JSON.parse(ajax.responseText);
                    if (responseAdress.erro === true){
                        $showStatus.id = 'red';
                        $showStatus.innerHTML =  "Erro! CEP não encontrado :(";
                        clearFields();
                        return;
                    }
                    $inputCep.value = formatCep(cep);
                    $inputEstado.value = responseAdress.uf || ' ';
                    $inputCidade.value = responseAdress.localidade || ' ';
                    $inputBairro.value = responseAdress.bairro || ' ';
                    $inputLogradouro.value = responseAdress.logradouro || ' ';
                    $showStatus.id = 'green';
                    $showStatus.innerHTML =  "Sucesso";
                }
                catch(e){
                    console.log('Error');
                    $showStatus.innerHTML = "Erro";
                }
            }
        }, false);
    }

    function requestOk(){
        return ajax.status === 200 && ajax.readyState === 4; 
    }

    function clearFields(){
        $allFields.forEach(function(field){
            field.value = '';
        });
    }

    function cleanCep(cep){
        var regOnlyNumbers = /\d/g;
        return cep.match(regOnlyNumbers).join('');
    }

    function filter(cep){
        var regCepFilter = /\d{8}/;
        return cep.match(regCepFilter).join('');
    }

    function formatCep(cep){
        var regCepFormat = /(\d{5})(\d{3})/;
        cep = cep.replace(regCepFormat, function(capTotal, part1, part2){
            return part1 + '-' + part2;
        });
        return cep;
    }

})(window, document);