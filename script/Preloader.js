var Preloader = {
  queue: new createjs.LoadQueue(true),
  loadText: new createjs.Text("", "24px helvetica", "rgba(0,0,0,0.7)"),
  load: function(){
    Game.stage.addChild(this.loadText);
    this.queue.on("progress", this.progress, this);
    this.queue.on("complete", Game.setupGame, Game);
    this.queue.loadManifest([
      {id: "panther", src: "data/panther_small.json"},
      {id: "mushrooms_xs", src: "data/mushrooms_xs.json"},
      {id: "tiles", src: "data/tiles.json"},
      {id: "levels", src: "data/levels.json"},
      "script/Ticker.js", "script/Objects.js", "script/Controls.js"
    ]);
  },
  progress: function(e){
    this.loadText.text = Math.round(e.progress * 100) + "%";
    Game.stage.update();
  }
}

  // queue.installPlugin(createjs.Sound);
