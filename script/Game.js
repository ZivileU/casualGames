var panther, levelText, scoreText, gaveOverText, diamond;
var platforms = [], diamonds = [], currentLevel = -1, count = 0, level = 0, diamondsCaught = 0;

var Game = {
  stage: new createjs.Stage("pantherGame"),
  settings: {
    maxGravity: 6,
    resetJumpPower: 30,
    pantherSpeed: 5,
    platformSpeed: 1
  },
  init: function (){
    Preloader.load();
    console.log("Game ready")
  },
  setupGame: function(){
    this.stage.removeAllChildren();
    Controls.initialize();
    Ticker.start();
    this.nextLevel();

    this.panther = Objects.getPanther();
    Game.stage.addChild(this.panther);
    this.platform = Objects.addImage("img/flying_platform.png", 50, 450, 0.3, 0.3);
    Game.stage.addChild(this.platform);
    this.platform.width = 217;
    this.platform.height = 82;
    platforms.push(this.platform);

    levelText = new createjs.Text("Level: "+level, "14px helvetica", 500, "rgba(0,0,0,0.7)");
    levelText.x = 850;
    levelText.y = 50;

    scoreText = new createjs.Text("Score: "+diamondsCaught, "14px helvetica", 500, "rgba(0,0,0,0.7)");
    scoreText.x = 850;
    scoreText.y = 80;

    gaveOverText = new createjs.Text("Game Over", "36px helvetica", "rgba(0,0,0,0.7)");
    gaveOverText.x = -100;
    gaveOverText.y = -100;
    gaveOverText.textAlign = "center";
    gaveOverText.textBaseline = "middle";

    this.stage.addChild(levelText);
    this.stage.addChild(scoreText);
    this.stage.addChild(gaveOverText);
  },
  nextLevel: function(){
    currentLevel++;
    var temp = Preloader.queue.getResult('levels');
    var levelData = temp.levels[currentLevel];
    // for(var j = 0; j < levelData.platforms.length; j++){
    //   var t = new createjs.Sprite()
    // }
  },
  objectOnPlatform: function(moving, stationary) {
    if (moving.x < stationary.x + stationary.width
      && moving.x + moving.width > stationary.x
      && Math.abs((moving.y + moving.height) - stationary.y)< 4
    ){
      moving.y = stationary.y - moving.height;
      return true;
    }
    return false;
  },
  moveHero: function(){
    var standingOnPlatform = false;
    var canJump = false;

    for (var i = 0; i<platforms.length; i++) {
      if (this.objectOnPlatform(this.panther, platforms[i])) {
        standingOnPlatform = true;
        canJump = true;
      }
    }
    if(Controls.rkd){
      this.panther.x += this.settings.pantherSpeed;
    } else if(Controls.lkd){
      this.panther.x -= this.settings.pantherSpeed;
    } else if(Controls.ukd){
      this.panther.y-=3
    } else if(Controls.dkd){
      this.panther.y+=3
    }
    //jumping logics
    if(Controls.ukd && canJump) {
      canJump = false;
      standingOnPlatform = false;
      this.panther.jumpPower = this.settings.resetJumpPower;
    }
    if(this.panther.jumpPower > 0){
      this.panther.y -= this.panther.jumpPower;
      this.panther.jumpPower--;
    }
    //apply gravity
    if(!standingOnPlatform){
      this.panther.y+=this.panther.gravityEffect;
      this.panther.gravityEffect++;
      if(this.panther.gravityEffect > this.settings.maxGravity){
        this.panther.gravityEffect = this.settings.maxGravity;
      }
    }
    if (this.panther.y > 650) {
      gameOver();
    }
  },
  movePlatform: function(){
    if(this.platform.x + this.settings.platformSpeed > 1000 - this.platform.width || this.platform.x + this.settings.platformSpeed < 0) {
      this.settings.platformSpeed = -(this.settings.platformSpeed);
      // changeDirection();
    }
    this.platform.x += this.settings.platformSpeed;
  }
  // changeDirection: function(){
  //   if(this.panther.dir == "right" && this.panther.x>Game.stage.canvas.width-250){
  //     this.panther.dir = "left";
  //     this.panther.scaleX*=-1;
  //   } else if (this.panther.dir == "left" && this.panther.x<1){
  //     this.panther.dir = "right";
  //     this.panther.scaleX*=-1;
  //   }
  // }
}

function hitTest(rect1, rect2) {
  if(rect1.x >= rect2.x + rect2.width
    || rect1.x + rect1.width <= rect2.x
    || rect1.y >= rect2.y + rect2.height
    || rect1.y + rect1.height <= rect2.y)
  {
    return false;
  }
  return true;
}
function diamondCought(){
  for (var i = 0; i<diamonds.length; i++) {
    if (hitTest(Game.panther, diamonds[i])) {
      diamondsCaught++;
      console.log(diamondsCaught);
      Game.stage.removeChild(diamonds[i]);
      diamonds.splice(diamonds[i]);
    }
  }
}
function createDiamond(){
  diamond = new createjs.Shape();
  var x = Math.floor(Math.random()*800);
  var y = Math.floor(Math.random()*100);
  diamond.graphics.beginFill("rgba(0,0,0,0.7)");
  diamond.graphics.moveTo(x, y).lineTo(x+12.5, y+20).lineTo(x+25, y).lineTo(x+12.5, y-20).lineTo(x, y);
  diamond.x = x;
  diamond.y = y;
  diamond.width = 25;
  diamond.height = 40;
  diamond.shadow = new createjs.Shadow("#ffffff", 1, 1, 10);
  diamond.cursor = "pointer";
  diamonds.push(diamond);
  Game.stage.addChild(diamond);
  // pulse(diamond);
  if (diamonds.length > 50) {
    gameOver();
  }
}
function counter(){
  if (count==50) {
    console.log("hi");
    createDiamond();
    count = 0;
  }
  count++;
}
function gameOver() {
  createjs.Tween.get(gaveOverText).to({
    x: 500,
    y: 350
  }, 1500, createjs.Ease.backOut);
  // createjs.Sound.play("pantherSound");
}
