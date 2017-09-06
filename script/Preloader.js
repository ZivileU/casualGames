var Preloader = {
  queue: new createjs.LoadQueue(true),
  loadText: new createjs.Text("", "24px helvetica", "rgba(0,0,0,0.7)"),
  load: function(){
    Game.stage.addChild(this.loadText);
    this.queue.installPlugin(createjs.Sound);
    this.queue.on("progress", this.progress, this);
    this.queue.on("complete", Game.setupGame, Game);
    this.queue.loadManifest([
      {id: "panther", src: "data/panther.json"},
      {id: "levels", src: "data/levels.json"},
      {id: "pantherSound", src: "audio/panther.mp3"},
      "script/Ticker.js", "script/Objects.js", "script/Controls.js"
    ]);
  },
  progress: function(e){
    this.loadText.text = Math.round(e.progress * 100) + "%";
    Game.stage.update();
  }
}

  // queue.installPlugin(createjs.Sound);
