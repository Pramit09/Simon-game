var userClickedPattern = [];
var gamePattern = [];

var buttonColor = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        newSequence();
        started = true;
    }
});

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswers(userClickedPattern.length-1);
});

function checkAnswers(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log('success');
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {newSequence();}, 1000);
        }
    }
    else {
        console.log('failure');
        $("body").addClass('game-over');
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("#level-title").html("Game Over, Your score: "+ level +"<br>Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass('game-over');
        },200);
        startOver();
        
    }
}


function newSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () { $("#" + currentColor).removeClass("pressed"); }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;

}


