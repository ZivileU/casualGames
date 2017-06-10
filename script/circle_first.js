var stage;
var circle;
var tween
var background = document.getElementById("mySecond");
var currentColor=-1;
var directions = ["right", "left", "top", "bottom"];
var colors = ["#94AE89", "#A8BCA1", "#C0DA74", "#BEEDAA", "#D5FFD9", "#D1F0B1", "#8C8A93", "#F1F7ED"];

function init() {
  stage = new createjs.Stage("mySecond");
  createjs.Ticker.setFPS(2000);
  createjs.Ticker.addEventListener("tick", tock);

  circle = new createjs.Shape();
  circle.graphics.beginFill("#54494B");
  circle.radius = 60;
  circle.graphics.drawCircle(0, 0, circle.radius);
  circle.cursor = "pointer";
  stage.enableMouseOver();

  circle.direction = directions[Math.floor(Math.random()*directions.length)];

  circle.y=100;
  circle.x=circle.radius;
  // circle.addEventListener("click", tween);

  stage.addChild(circle);
  console.log(circle);
}

// function tween(){
//   createjs.Tween.get(circle, {loop: true})
//       .to({x: circle.x, y: background.height - 55, rotation: -360}, 1500, createjs.Ease.bounceOut)
//       .wait(1000)
//       .to({x: background.width - 55, rotation: 360}, 2500, createjs.Ease.bounceOut)
//       .wait(1000).call(handleComplete)
//       .to({scaleX: 2, scaleY: 2, x: background.width - 110, y: background.height - 110}, 2500, createjs.Ease.bounceOut)
//       .wait(1000)
//       .to({scaleX: .5, scaleY: .5, x: 30, rotation: -360, y: background.height - 30}, 2500, createjs.Ease.bounceOut);
// }

function circleClicked(e){
  e.target.y+=50;
  e.target.clicks++;
  circle.removeEventListener("click", circleClicked);
}

function moveCircle(){
  if (circle.direction=="right") {
    circle.x+=1;
    if (circle.x > 1280-circle.radius) {
      // direction="left";
      changeColor();
      chanageDirection();
    }
  } else if (circle.direction=="left") {
    circle.x-=1;
    if (circle.x < circle.radius) {
      // direction="right";
      changeColor();
      chanageDirection();
    }
  } else if (circle.direction=="top") {
    circle.y-=1;
    if (circle.y < 0+circle.radius) {
      // direction="bottom";
      changeColor();
      chanageDirection();
    }
  } else if (circle.direction=="bottom") {
    circle.y+=1;
    if (circle.y > 700 - circle.radius) {
      // direction="top";
      changeColor();
      chanageDirection();
    }
  }
}

function changeColor(){
  currentColor++
  if(currentColor==colors.length){
    currentColor=0
  }
    background.style.backgroundColor = colors[currentColor];
}

function chanageDirection(){
  circle.direction = directions[Math.floor(Math.random()*directions.length)];
  console.log(circle.direction);
}

function handleComplete(tween) {
  circle = tween._target;
}

function tock(e){
  moveCircle();
  stage.update(e);
}

window.addEventListener("load", init);
