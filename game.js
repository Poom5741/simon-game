var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var randomChosenColor = "";
var userClickedPattern = [];
var level = 0;

//playsound
function playSound(color) {
  let audio = new Audio("./sounds/" + color + ".mp3");
  audio.play();
}
//detect first key to start
$("body").one("keydown", function () {
  newSequence();
});

//make sequence
function newSequence() {
  $("h1").html("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  //console.log(randomNumber);

  randomChosenColor = buttonColors[randomNumber];
  //console.log(randomChosenColor);
  gamePattern.push(randomChosenColor);
  //console.log(gamePattern);

  $("#" + buttonColors[randomNumber])
    .fadeOut(70)
    .fadeIn(70)
    .fadeOut(70)
    .fadeIn(70);
  playSound(randomChosenColor);

  level++;
}

//detect button user click
$(".btn").click(function () {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
  //console.log(gamePattern);
  //console.log(userClickedPattern);
});

//animate button when click
function animatePress(currentColor) {
  var currentColor = "." + currentColor;
  $(currentColor).addClass("pressed");
  setTimeout(function () {
    $(currentColor).removeClass("pressed");
  }, 100);
}

function areEqual(array1, array2) {
  if (array1.length === array2.length) {
    return array1.every((element, index) => {
      if (element === array2[index]) {
        return true;
      }

      return false;
    });
  }

  return false;
}

function checkAnswer(currentLevel) {
  if (
    gamePattern[currentLevel] === userClickedPattern[currentLevel] &&
    areEqual(gamePattern, userClickedPattern)
  ) {
    console.log("success");
    userClickedPattern = [];
    setTimeout(function () {
      newSequence();
    }, 1000);
  } else if (
    gamePattern.length === userClickedPattern.length &&
    !areEqual(gamePattern, userClickedPattern)
  ) {
    console.log("wrong");
    playSound("wrong");
    $("body")
      .addClass("game-over")
      .delay(200)
      .queue(function () {
        $("body").removeClass("game-over");
        $("body").dequeue();
      });
    $("h1").html("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  $("body").one("keydown", function () {
    newSequence();
  });
}
