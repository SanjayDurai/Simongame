var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userclickedpattern = [];

var started = false;
var level = 0;



$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextsequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userchosencolour = $(this).attr("id");
    userclickedpattern.push(userchosencolour);
    playsound(userchosencolour);
    animatePress(userchosencolour);
    checkAnswer(userclickedpattern.length-1);

    // console.log(userclickedpattern);
})


function checkAnswer(currentlevel){

    if(gamePattern[currentlevel] === userclickedpattern[currentlevel]){
        console.log("success");
        if(gamePattern.length === userclickedpattern.length){
            setTimeout(function(){
                nextsequence();
            },1000);
        }

    }
    else{
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");

        },200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        var wrongaudio = new Audio("sounds/wrong.mp3");
        wrongaudio.play();
        startOver();

    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;

}

function nextsequence(){
    userclickedpattern=[];
    level++;
    $("#level-title").text("Level "+level);


    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playsound(randomChosenColour);
    
}

function playsound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentcolor){
    $("#"+currentcolor).addClass("pressed");
    setTimeout(function (){
        $("#"+currentcolor).removeClass("pressed");

    },100);
}



