(function(win, doc){
    'use strict';
  
    var username = prompt('Qual o seu nome?');
    alert('Bem vindo ' + (username ? username : 'desconhecido'));

    var email = prompt('Qual o seu email?');

    var $inputUsername = doc.querySelector('#username');

    var $inputEmail = doc.querySelector('#email');

    var $message = doc.querySelector('#message');

    var $button = doc.querySelector('#button');

    $inputUsername.value = username;
    $inputEmail.value = email;

    $button.addEventListener('click', function(event){
        event.preventDefault();
        if (!$inputUsername.value)
            alert('Preencha o campo de usuário!');
        if (!$inputEmail.value)
            alert('Preencha o campo de email!');
        if (!$message.value)
            alert('Preencha o campo de mensagem!');
        if (!isValidEmail($inputEmail.value))
            alert('Entre com um email válido');
        else{
            var response = confirm('Tem certeza que deseja enviar o formulário?');
            alert(response ? 'Enviado com sucesso' : 'Não enviado');
        }
    }, false);

    function isValidEmail(email){
        var regexEmail = /^[\w\+\.]+[^_]@\w+\.\w{2,}(?:(?:\.\w{2,})+)?$/;
        return regexEmail.test(email);
    }
    
})(window, document);
