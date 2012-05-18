#!/usr/bin/env node

var app = module.exports = require('railway').createServer();

if (!module.parent) {
  var port = process.env.PORT || 3000;
  app.listen(port);
  console.log("Railway server listening on port %d within %s environment", port, app.settings.env);
}

var me = require('./public/javascripts/include.js');
var game = new me.Game();
game.run();

var nowjs = require("now");
var everyone = nowjs.initialize(app);


nowjs.on('connect', function() {
  game.addEntity(this.user.clientId, new me.Hero());
  this.now.loadGameState(game);
  everyone.now.addPlayer(this.user.clientId, game.entities[this.user.clientId]);
});

nowjs.on('disconnect', function() {
  game.removeEntity(this.user.clientId);
  everyone.now.removePlayer(this.user.clientId);
});

everyone.now.sendDirection = function(direction) {
  var id = this.user.clientId;
  game.updateEntity(id, {currentMovement: direction});
  var playerState = game.entities[id].getPosition();
  playerState.currentMovement = direction;
  everyone.now.updateDirection(id, playerState);
};