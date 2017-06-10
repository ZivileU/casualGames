var stage;
var house;
var roof;
var chimney;
var houseWindow;
var houseWindowTwo;
var houseDoor;
var smokes = [];
var background = document.querySelector("canvas");

function init() {
  stage = new createjs.Stage("myFirst");
  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", tock);

  house = new createjs.Shape();
  house.graphics.beginFill("#94AE89");
  house.graphics.drawRect(0, 0, 150, 125);
  house.x=525;
  house.y=400;

  houseWindow = new createjs.Shape();
  houseWindow.graphics.beginFill("#C0DA74");
  houseWindow.graphics.drawRect(0, 0, 25, 25);
  houseWindow.x=615;
  houseWindow.y=430;

  houseWindowTwo = new createjs.Shape();
  houseWindowTwo.graphics.beginFill("#C0DA74");
  houseWindowTwo.graphics.drawRect(0, 0, 25, 25);
  houseWindowTwo.x=558;
  houseWindowTwo.y=430;

  houseDoor = new createjs.Shape();
  houseDoor.graphics.beginFill("#C0DA74");
  houseDoor.graphics.drawRect(0, 0, 30, 40);
  houseDoor.x=587;
  houseDoor.y=485;

  chimney = new createjs.Shape();
  chimney.graphics.beginFill("#A8BCA1");
  chimney.graphics.drawRect(0, 0, 35, 80);
  chimney.x=625;
  chimney.y=300;

  roof = new createjs.Shape();
  roof.graphics.beginFill("#A8BCA1");
  roof.graphics.moveTo(500, 400).lineTo(700, 400).lineTo(600, 300).lineTo(500, 400);

  stage.addChild(roof);
  stage.addChild(house);
  stage.addChild(houseWindow);
  stage.addChild(houseWindowTwo);
  stage.addChild(houseDoor);
  stage.addChild(chimney);

}

function maybeAddSmoke() {
  var rand = Math.random()*100;
  if(rand < 1) {
    createSmoke();
  }
}

function createSmoke(){
  var smoke = new createjs.Bitmap("img/cloudNoStroke.png");
  smoke.x=625;
  smoke.y=260;
  smokes.push(smoke);
  stage.addChild(smoke);
}

function moveSmoke() {
  for (var i = smokes.length - 1; i >= 0; i--) {
    smokes[i].y--;
    if (smokes[i].y<-50) {
      stage.addChild(smokes[i]);
      smokes.splice(i, 1);
    }
  }
}

function tock(e){
  moveSmoke();
  stage.update(e);
  maybeAddSmoke();
  console.log(smokes);
}

window.addEventListener("load", init);
