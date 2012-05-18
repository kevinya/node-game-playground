#!/usr/bin/env node

var app = module.exports = require('railway').createServer();

if (!module.parent) {
  var port = process.env.PORT || 3000;
  app.listen(port);
  console.log("Railway server listening on port %d within %s environment", port, app.settings.env);
}

var gamejs = require("./public/javascripts/game");
var Entity = gamejs.Entity;
var Game = gamejs.Game;
var game = new Game();
game.run();

var nowjs = require("now");
var everyone = nowjs.initialize(app);

nowjs.on('connect', function() {
  game.addEntity(this.user.clientId, new Entity());
  this.now.loadGameState(game);
  everyone.now.addPlayer(this.user.clientId, game.entities[this.user.clientId]);
});

nowjs.on('disconnect', function() {
  game.removeEntity(this.user.clientId);
  everyone.now.removePlayer(this.user.clientId);
});

everyone.now.sendPosition = function(position) {
  var id = this.user.clientId;
  game.updatePosition(id, position);
  everyone.now.updatePosition(id, position);
};

everyone.now.sendVelocity = function(velocity) {
  var id = this.user.clientId;
  game.updateVelocity(id, velocity);
  everyone.now.updateVelocity(id, velocity);
};
