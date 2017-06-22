var Ticker = {
  start: function(){
    createjs.Ticker.setFPS(60);
    createjs.Ticker.on("tick", this.tock);
  },
  tock:function(e){
    // Game.panther.move();
    Game.stage.update(e);
  }
}
