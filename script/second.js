var stage;
var coins;
var points = 0;

function setup(){
  "use strict";
  stage = new createjs.Stage("myFirst");
  createjs.Ticker.setFPS(150);
  createjs.Ticker.addEventListener("tick", ticked);
}

function addCoin(){
  "use strict";
  var coin = new createjs.Shape();
  coin.graphics.beginFill("#26547C").drawCircle(0, 0, 10);
  coins.push(coin);
  stage.addChild(coin);
}

window.addEventListener("load", setup);
