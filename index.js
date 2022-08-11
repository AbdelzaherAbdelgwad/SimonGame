var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;

$("#level-title").text("Press any key to start");

function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("." + randomChosenColour).delay(100).fadeOut(20).fadeIn();
  playSound(randomChosenColour);
  ++level;
  test = level;
  $("#level-title").text("level " + level);
  userClickedPattern = [];

}




$(".btn").click(function() {

  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1)
});



function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function animatePress(currentColour) {

  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

var count = [];
$(document).keypress(function(e) {
  count.push(e.key);

  if (count.length == 1) {
    nextSequence();

  }



});

function startOver(){
  level =0;
  count = [];
  userClickedPattern = [];
  gamePattern = [];
}
function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      console.log(userClickedPattern);
      console.log(gamePattern);

    }

  }else if (gamePattern.length > 0 ){
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game over, press A key to go again");
    setTimeout(function() {
      startOver();
    }, 1000);
  }

}
