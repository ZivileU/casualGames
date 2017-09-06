var Controls = {
  lkd: false,
  rkd: false,
  dkd: false,
  ukd: false,
  initialize: function(){
    window.onkeyup = Controls.keyUp;
    window.onkeydown = Controls.keyDown;
  },
  keyUp: function(e){
    switch (e.keyCode) {
      case 37:
        Controls.lkd = false;
        break;
      case 38:
        Controls.ukd = false;
        break;
      case 39:
        Controls.rkd = false;
        break;
      case 40:
        Controls.dkd = false;
        break;
    }
  },
  keyDown: function(e){
    switch (e.keyCode) {
      case 37:
        Controls.lkd = true;
        break;
      case 38:
        Controls.ukd = true;
        break;
      case 39:
        Controls.rkd = true;
        break;
      case 40:
        Controls.dkd = true;
        break;
    }
  },
}
