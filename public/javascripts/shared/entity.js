(function(exports, undefined) {

  exports.Entity = Class.extend({
    init: function Entity(state) {
      state = typeof state !== 'undefined' ? state : {};
      this.x = state.x || this.x || 0;
      this.y = state.y || this.y || 0;
      this.vx = state.vx || this.vx || 0;
      this.vy = state.vy || this.vy || 0;
    },
    
    update: function update() {
      this.x += this.vx;
      this.y += this.vy;
    },
    
    toJSON: function toJSON() {
      var obj = {};
      for (var prop in this) {
        if (this.hasOwnProperty(prop)) {
          obj[prop] = this[prop];
        }
      }
      return obj;
    }
  });

})(typeof global === "undefined" ? window : exports);