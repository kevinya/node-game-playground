(function(exports, undefined) {
  //fn arg can be an object or a function, thanks to handleEvent
  function on(el, evt, fn, bubble) {
    if("addEventListener" in el) {
      // BBOS6 doesn't support handleEvent, catch and polyfill
      try {
        el.addEventListener(evt, fn, bubble);
      } catch(e) {
        if(typeof fn == "object" && fn.handleEvent) {
          el.addEventListener(evt, function(e) {
            // Bind fn as this and set first arg as event object
            fn.handleEvent.call(fn,e);
          }, bubble);
        } else {
          throw e;
        }
      }
    } else if("attachEvent" in el) {
      // check if the callback is an object and contains handleEvent
      if(typeof fn == "object" && fn.handleEvent) {
        el.attachEvent("on" + evt, function(){
          // Bind fn as this
          fn.handleEvent.call(fn);
        });
      } else {
        el.attachEvent("on" + evt, fn);
      }
    }
  }

  exports.Input = Class.extend({
    keys: {
      LEFT: 37,
      TOP: 38,
      RIGHT: 39,
      DOWN: 40
    },
    
    directions: {
      LEFT: 1,
      TOP: 2,
      RIGHT: 3,
      DOWN: 4,
      TOP_LEFT: 5,
      TOP_RIGHT: 6,
      DOWN_RIGHT: 7,
      DOWN_LEFT: 8,
      STAND: 9
    },

    init: function Input(network) {
      this.network = network;
      this.keyStatus = [];
      this.enableKeyboard();
    },

    enableKeyboard: function enableKeyboard() {
      var ctx = this;
      on(exports, 'keydown', function(e, keyCode) {
        ctx.onKeyDown(e, keyCode);
      }, false);
      on(exports, 'keyup', function(e, keyCode) {
        ctx.onKeyUp(e, keyCode);
      }, false);
    },

    onKeyDown: function onKeyDown(e, keyCode) {
      var code = keyCode || e.keyCode || e.which;
      if (!this.keyStatus[code]) {
        this.keyStatus[code] = true;
        this.computeDirection();
      }
    },

    onKeyUp: function onKeyDown(e, keyCode) {
      var code = keyCode || e.keyCode || e.which;
      if (this.keyStatus[code]) {
        this.keyStatus[code] = false;
        this.computeDirection();
      }
    },

    computeDirection: function computeDirection() {
      var direction = this.directions.STAND;
      if (this.keyStatus[this.keys.TOP]) {
        direction = this.directions.TOP;
        if (this.keyStatus[this.keys.LEFT]) {
          direction = this.directions.TOP_LEFT;
        } else if (this.keyStatus[this.keys.RIGHT]) {
          direction = this.directions.TOP_RIGHT;
        }
      } else if (this.keyStatus[this.keys.DOWN]) {
        direction = this.directions.DOWN;
        if (this.keyStatus[this.keys.LEFT]) {
          direction = this.directions.DOWN_LEFT;
        } else if (this.keyStatus[this.keys.RIGHT]) {
          direction = this.directions.DOWN_RIGHT;
        }
      } else if (this.keyStatus[this.keys.LEFT]) {
        direction = this.directions.LEFT;
      } else if (this.keyStatus[this.keys.RIGHT]) {
        direction = this.directions.RIGHT;
      }
      
      this.network.changeDirection(direction);
    }
  });

})(window);