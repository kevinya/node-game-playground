(function(exports, undefined) {
  
  exports.Network = Class.extend({
    init: function Network(game) {
      this.game = game;
      
      if (typeof now === 'undefined') {
        this.network = this;
        this.clientId = 1;
        this.game.addEntity(this.clientId, new Hero());
      } else {
        this.network = now;
      }
      
      
      
      // Messages from server
      var ctx = this;
      this.network.loadGameState = function loadGameState(gameState) {
         ctx.game.init(gameState);
      };
      
      this.network.addPlayer = function addPlayer(id, entity) {
        ctx.game.addEntity(id, new Hero(entity));
      };
      
      this.network.removePlayer = function removePlayer(id) {
        ctx.game.removeEntity(id);
      };
      
      this.network.updateDirection = function updateDirection(id, entityState) {
        ctx.game.updateEntity(id, entityState);
      };
    },
    
    changeDirection: function changeDirection(direction) {
      this.network.sendDirection(direction);
    },
    
    // Simulate server
    sendDirection: function sendDirection(direction) {
      this.updateDirection(this.clientId, {currentMovement: direction});
    }
  });
  
})(window);