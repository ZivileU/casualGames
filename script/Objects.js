var Objects = {
  getPanther: function(){
    var ssPanther = new createjs.SpriteSheet(Preloader.queue.getResult("panther"));
    var t = new createjs.Sprite(ssPanther, "run");
    t.y = 50;
    t.scaleX = 0.5;
    t.scaleY = 0.5;
    t.gravityEffect = 0;
    t.jumpPower = 0;
    t.height = 127;
    t.width = 250;
    t.dir = "right";
    return t;
  },
  addImage: function(path,x,y, scaleX, scaleY) {
    var image = new createjs.Bitmap(path);
    image.x=x;
    image.y=y;
    image.scaleX = scaleX;
    image.scaleY = scaleY;
    return image;
  }
  // getMushroom: function(){
  //   var ssMushrooms = new createjs.SpriteSheet(Preloader.queue.getResult("mushrooms_xs"));
  //   var m = new createjs.Sprite(ssMushrooms, "pinkCircle");
  //   return m;
  // }
  // getTiles: function(){
  //   var ssTiles = new createjs.SpriteSheet(Preloader.queue.getResult("tiles"));
  //   var tile = new createjs.Sprite(ssTiles, "greyBricks");
  //   return tile;
  // }
}
