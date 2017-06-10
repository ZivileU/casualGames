window.addEventListener('keydown', k);

  var stage;
  var circle;

  function k(e) {
    console.log(e.keyCode);
  }

function init() {
  stage = new createjs.Stage("myFirst");
  createjs.Ticker.setFPS(150);
  createjs.Ticker.addEventListener("tick", tock);

  circle = new createjs.Shape();
  circle.graphics.beginFill("#26547C");
  circle.radius = 60;
  circle.graphics.drawCircle(0, 0, circle.radius);
}

function tock(e){
  stage.update(e);
}

window.addEventListener("load", init);

