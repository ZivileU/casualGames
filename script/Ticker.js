var Ticker = {
  start: function(){
    createjs.Ticker.setFPS(60);
    createjs.Ticker.on("tick", this.tock);
  },
  tock: function(e){
    Game.moveHero();
    Game.movePlatform();
    Game.stage.update(e);
    counter();
    diamondCought();
  }
}
