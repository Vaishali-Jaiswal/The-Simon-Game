
var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keydown(function (){
    
    if(!started){
        $("h1").text("Level - "+level);
        nextSequence();
    }     
});

$("button").click(function() {

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    
    animatePress(userChosenColor);
    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("Success");

        if (userClickedPattern.length === gamePattern.length){

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextSequence();
            }, 1000);
       } 
    }    
    else {
        console.log("Wrong");
        
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
           $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key To Restart");

        startOver();
    }
}


function nextSequence() {

    userClickedPattern = [];

    level++;
    $("h1").text("Level - "+level);
    
    var randomNumber = Math.floor(Math.random(randomNumber)*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); 
    playSound(randomChosenColor);
}

function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
} 

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}