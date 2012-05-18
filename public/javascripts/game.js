(function(exports) {

var Game = function(params) {
  if (params) {
    this.lastTick = params.lastTick;
    this.currentTick = params.currentTick;
    this.entities = {};
    for (var id in params.entities) {
      this.addEntity(id, new Entity(params.entities[id]));
    }
  } else {
    this.lastTick = new Date().getTime();
    this.currentTick = this.lastTick;
    this.entities = {};
  }
};

Game.TICKS_PER_SECONDS = 50;
Game.SKIP_TICKS = 1000 / Game.TICKS_PER_SECONDS;
Game.MAX_FRAMESKIP = 5;

Game.prototype.addEntity = function(id, entity) {
  this.entities[id] = new Entity(entity);
};

Game.prototype.removeEntity = function(id) {
  delete this.entities[id];
};

Game.prototype.updatePosition = function(id, position) {
  this.entities[id].position = new Point(position);
};

Game.prototype.updateVelocity = function(id, velocity) {
  this.entities[id].velocity = new Point(velocity);
};

Game.prototype.getTickCount = function() {
  return this.currentTick - this.lastTick;
};

Game.prototype.update = function() {
  this.currentTick = new Date().getTime();
  var loops = 0;
  while (this.getTickCount() > Game.SKIP_TICKS && loops < Game.MAX_FRAMESKIP) {
    for(var i in this.entities) {
      this.entities[i].update();
    }
    this.lastTick += Game.SKIP_TICKS;
    ++loops;
  }
};

Game.prototype.run = function() {
    var ctx = this;
    setInterval(function() {
        ctx.update();
    }, 0);
};

var Point = function(params) {
  if (params) {
    this.x = params.x;
    this.y = params.y;
  } else {
    this.x = 0;
    this.y = 0;
  }
};

Point.prototype.add = function(vector) {
  this.x += vector.x;
  this.y += vector.y;
};

var Entity = function(params) {
  if (params) {
    this.position = new Point(params.position);
    this.velocity = new Point(params.velocity);
  } else {
    this.position = new Point();
    this.velocity = new Point();    
  }
};

Entity.prototype.update = function() {
  this.position.add(this.velocity);
};

exports.Game = Game;
exports.Point = Point;
exports.Entity = Entity;

})(typeof global === "undefined" ? window : exports);