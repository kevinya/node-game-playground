(function(exports, undefined) {

  exports.Game = Class.extend({
    TICKS_PER_SECONDS: 60,
    SKIP_TICKS: (1000 / 60) << 0,
    MAX_FRAMESKIP: 5,

    init: function Game(state) {
      state = typeof state !== 'undefined' ? state : {};
      this.timer = state.timer || this.timer || null;
      this.lastTick = state.lastTick || this.lastTick || new Date().getTime();
      this.entities = state.entities || this.entities || {};
      for (var id in this.entities) {
        this.entities[id] = new Hero(this.entities[id]);
      }
    },
    
    run: function run() {
      var ctx = this;
      this.timer = setInterval(function timer() {
        ctx.update();
      } ,0);
    },

    stop: function stop() {
      clearInterval(this.timer);
    },

    update: function update() {
      var loop = 0;
      var currentTime = new Date().getTime();
      while (currentTime > this.lastTick + this.SKIP_TICKS
          && loop < this.MAX_FRAMESKIP) {
        for (var id in this.entities) {
          this.entities[id].update();
        }
        this.lastTick += this.SKIP_TICKS;
        loop++;
      }
    },
    
    addEntity: function addEntity(id, entity) {
      this.entities[id] = entity;
    },
    
    removeEntity: function removeEntity(id) {
      delete this.entities[id];
    },
    
    updateEntity: function updateEntity(id, entityState) {
      this.entities[id].init(entityState);
    }
  });

})(typeof global === "undefined" ? window : exports);