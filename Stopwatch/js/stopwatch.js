(function(win, doc){
    'use strict';

    var $inputTime = doc.querySelector("[data-js=time]");
    var $buttonStart = doc.querySelector("[data-js=start]");
    var $buttonStop = doc.querySelector("[data-js=stop]");
    var $buttonReset = doc.querySelector("[data-js=reset]");

    console.log($inputTime.value);

    var time;
    function start(){
        $inputTime.value++;
        time = setTimeout(start, 1000);
    }

    function stop(){
        clearTimeout(time);
    }

    function reset(){
        stop();
        $inputTime.value = 0;
    }


    $buttonStart.addEventListener('click', function(event){
        event.preventDefault();
        start();

    }, false)

    $buttonStop.addEventListener('click', function(event){
        event.preventDefault();
        stop();

    }, false)

    $buttonReset.addEventListener('click', function(event){
        event.preventDefault();
        reset();

    }, false)

})(window, document);