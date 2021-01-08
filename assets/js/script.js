var textBox = document.querySelector("#question");
var timer = document.querySelector("#timer");
var btnClick = document.querySelector(".btn");
var secRemaining = 90;

document.querySelector("#btnStart").addEventListener("click", function(e){
    e.preventDefault();

    timerFunc;
});

var timerFunc = setInterval(function(){
    secRemaining--;
    timer.textContent = ("Time: " + secRemaining);

    if (secRemaining === 0) {
        clearInterval(timerFunc);
        textBox.textContent = "Game Over :(";
    }
}, 1000);
