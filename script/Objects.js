var Objects = {
  getPanther: function(){
    var ssPanther = new createjs.SpriteSheet(Preloader.queue.getResult("panther"));
    var t = new createjs.Sprite(ssPanther, "run");
    t.y = 90;
    t.dir = "right";
    t.move = function(){
      if (Controls.rkd) {
        this.x++;
      }
    }
    return t;
  },
  // getMushroom: function(){
  //   var ssMushrooms = new createjs.SpriteSheet(Preloader.queue.getResult("mushrooms_xs"));
  //   var m = new createjs.Sprite(ssMushrooms, "pinkCircle");
  //   return m;
  // }
  getTiles: function(){
    var ssTiles = new createjs.SpriteSheet(Preloader.queue.getResult("tiles"));
    var tile = new createjs.Sprite(ssTiles, "greyBricks");
    return tile;
  }
}
