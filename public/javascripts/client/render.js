(function(exports, undefined) {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                   || window[vendors[x]+'CancelRequestAnimationFrame'];
  }
 
  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
 
  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  
  exports.Renderer = Class.extend({
    init: function Renderer(game, canvas) {
      this.lastTick = game.timeLastTick;
      this.currentTick = this.lastTick;
      this.game = game;
      this.canvas = canvas;
      this.context = this.canvas.getContext('2d');
      this.render();
    },
    
    getTickCount: function getTickCount() {
      return this.currentTick - this.lastTick;
    },
    
    render: function render() {
      this.currentTick = new Date().getTime();
      var context = this.context;
      context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      //var delta = this.getTickCount() / this.game.SKIP_TICKS;
      for (var i in this.game.entities) {
        var entity = this.game.entities[i];
        var radius = 20;
        
        context.beginPath();
        context.arc(entity.x, entity.y, radius, 0, 2 * Math.PI, false);
        context.fillStyle = "#8ED6FF";
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = "black";
        context.stroke();
      }
      this.lastTick += this.getTickCount();
      var ctx = this;
      window.requestAnimationFrame(function requestAnimationFrame() {
        ctx.render();
      });
    }
  });
  
})(window);