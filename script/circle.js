
var stage;
var circle;
var levelText;
var scoreText;
var gaveOverText;
var progressText;
var diamond;
var diamonds = [];
var clicks = 0;
var level = 0;
var count = 0;
var currentColor=-1;
var background = document.getElementById("circleGame");
var colors = ["#FFFFFF", "#800020", "#DD0F1D", "#0C090D", "#AFAFAF"];
var backgroundWidth = 1280;
var backgroundHeight = 700;
var dx = 2;
var dy = 2;

function init() {
  stage = new createjs.Stage("circleGame");
  createjs.Ticker.setFPS(50);

  queue = new createjs.LoadQueue(true);
  queue.installPlugin(createjs.Sound);
  queue.loadManifest([
    {
      id: "vortex", src: "audio/vortex.mp3"
    },
    {
      id: "thunk", src: "audio/thunk.mp3"
    },
    {
      id: "valesmere", src: "audio/valesmere.mp3"
    },
    {
      id: "hatch", src: "audio/hatch.mp3"
    },
    {
      id: "pineal", src: "audio/pineal_gland.mp3"
    },
  ]);
  queue.addEventListener("progress", progressHappened);
  queue.addEventListener("complete", completeHappened);

  levelText = new createjs.Text("Level: "+level, "14px helvetica", 500, "rgba(0,0,0,0.7)");
  levelText.x = levelText.y = 50;

  scoreText = new createjs.Text("Score: "+clicks, "14px helvetica", 500, "rgba(0,0,0,0.7)");
  scoreText.x = 50;
  scoreText.y = 80;

  gaveOverText = new createjs.Text("Game Over", "36px helvetica", "rgba(0,0,0,0.7)");
  gaveOverText.x = -100;
  gaveOverText.y = -100;
  gaveOverText.textAlign = "center";
  gaveOverText.textBaseline = "middle";

  progressText = new createjs.Text("0%", "36px helvetica", "rgba(0,0,0,0.7)");
  progressText.textAlign = "center";
  progressText.textBaseline = "middle";
  progressText.x = 600;
  progressText.y = 350;

  circle = new createjs.Shape();
  circle.graphics.beginFill("#EFC7C2");
  circle.radius = 60;
  circle.graphics.drawCircle(0, 0, circle.radius);
  circle.y=backgroundWidth/2;
  circle.x=backgroundHeight - 30;

  stage.addChild(levelText);
  stage.addChild(scoreText);
  stage.addChild(gaveOverText);
  stage.addChild(progressText);
  stage.addChild(circle);

  stage.enableMouseOver();
  window.addEventListener("keydown", muteMyGameSound);
}

function progressHappened(e){
  progressText.text = Math.round(e.progress * 100) + "%";
  stage.update();
}

function completeHappened(e){
  createjs.Ticker.addEventListener("tick", tock);
  createjs.Sound.play("vortex");
  stage.removeChild(progressText);
}

function muteMyGameSound(e) {
 if (e.keyCode == 77) {
    createjs.Sound.muted = !createjs.Sound.muted;
  }
}

// function tween(){
//   createjs.Tween.get(scoreText)
//       .to({fontsize: 18px}, 500, createjs.Ease.backInOut)
//       // .wait(1000)
//       // .to({x: background.width - 55, rotation: 360}, 2500, createjs.Ease.bounceOut)
//       // .wait(1000).call(handleComplete)
//       // .to({scaleX: 2, scaleY: 2, x: background.width - 110, y: background.height - 110}, 2500, createjs.Ease.bounceOut)
//       // .wait(1000)
//       // .to({scaleX: .5, scaleY: .5, x: 30, rotation: -360, y: background.height - 30}, 2500, createjs.Ease.bounceOut);
// }

function createDiamond(){
  diamond = new createjs.Shape();
  var x = Math.floor(Math.random()*1000);
  var y = Math.floor(Math.random()*600);
  diamond.graphics.beginFill("rgba(0,0,0,0.7)");
  diamond.graphics.moveTo(x, y).lineTo(x+12.5, y+20).lineTo(x+25, y).lineTo(x+12.5, y-20).lineTo(x, y);
  diamond.x = x;
  diamond.y = y;
  diamond.shadow = new createjs.Shadow("#5C5C5C", 1, 1, 10);
  diamond.cursor = "pointer";
  diamonds.push(diamond);
  stage.addChild(diamond);
  // pulse(diamond);
  diamond.addEventListener("mouseover", hovered);
  if (diamonds.length > 50) {
    gameOver();
  }
  console.log("diamond: " + diamond.x, diamond.y);
}

function counter(){
  if (count==10) {
    createDiamond();
    count = 0;
  }
  count++;
}

// function pulse(el){
//   createjs.Tween.get(el).to({scaleX: 2, scaleY: 2, x: background.width - 110, y: background.height - 110}, 2500);
// }

function moveCircle(){
  var random = Math.floor((Math.random() * 10) + 1);
  if(circle.x + dx > backgroundWidth-circle.radius || circle.x + dx < circle.radius) {
    dx = -(dx + random);
    changeColor();
  } else if(circle.y + dy > backgroundHeight-circle.radius || circle.y + dy < circle.radius) {
    dy = -(dy + random);
    changeColor();
    // console.log(circle.x, circle.y);
    // console.log(random);
  }
  circle.x += dx;
  circle.y += dy;
  // console.log(circle.x, circle.y);
}

function hovered(e){
  for (var i = 0; i<diamonds.length; i++) {
    if (e) {
      stage.removeChild(e.target);
      diamonds.splice(i, 1);
    }
  }
  clicks++;
  levelUp();
}

function levelUp() {
  if (clicks > 5) {
    level++;
    clicks = 0;
    dx=dx+2;
    dy=dy+2;
  }
  console.log(dx, dy);
}

function gameOver() {
  createjs.Tween.get(gaveOverText).to({
    x: 600,
    y: 350
  }, 1500, createjs.Ease.backOut);
  for (var i = 0; i<diamonds.length; i++) {
    diamonds[i].removeEventListener("mouseover", hovered);
  }
}

function changeColor(){
  currentColor++
  if(currentColor==colors.length){
    currentColor=0
  }
    background.style.backgroundColor = colors[currentColor];
}

function tock(e){
  moveCircle();
  counter();
  levelText.text = "Level: "+level;
  scoreText.text = "Score: "+clicks;
  stage.update(e);
}

window.addEventListener("load", init);
