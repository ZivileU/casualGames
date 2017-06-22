var panther;
var platforms = [], currentLevel = -1;

var Game = {
  stage: new createjs.Stage("pantherGame"),
  init: function (){
    Preloader.load();
    console.log("Game ready")
  },
  setupGame: function(){
    this.stage.removeAllChildren();
    this.panther = Objects.getPanther();
    Game.stage.addChild(this.panther);
    // this.mushroom = Objects.getMushroom();
    // Game.stage.addChild(this.mushroom);
    // this.tile = Objects.getTiles();
    // Game.stage.addChild(this.tile);
    Controls.initialize();
    Ticker.start();
    this.nextLevel();
    this.addImage("img/flying_platform.png", 100, 50);
  },
  nextLevel: function(){
    currentLevel++;
    var temp = Preloader.queue.getResult('levels');
    var levelData = temp.levels[currentLevel];
    // for(var j = 0; j < levelData.platforms.length; j++){
    //   var t = new createjs.Sprite()
    // }
  },
  addImage: function(path,x,y) {
      var image = new createjs.Bitmap(path);
      x = image.x;
      y = image.y;
      Game.stage.addChild(image);
  }
}

// function gameReady(){
//   createjs.Ticker.setFPS(60);
//   createjs.Ticker.addEventListener("tick", tock);
//   var ssPanther = new createjs.SpriteSheet(queue.getResult("panther"));
//   panther = new createjs.Sprite(ssPanther, "run");
//   panther.scaleX = 0.75;
//   panther.scaleY = 0.75;
//   panther.x = 3;
//   panther.y = 100;
//   stage.addChild(panther);
// }

// function tock(e){
//   stage.update(e);
// }



