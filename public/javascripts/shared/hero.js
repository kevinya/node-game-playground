if (typeof global !== "undefined") {
  var Entity = require('./entity').Entity;
}

(function(exports, undefined) {

  exports.Hero = Entity.extend({
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
    
    animationTypes: {
      STAND: 0,
      WALK: 1,
      ATTACK: 2
    },
    
    animations: null,
    
    movespeed: 4,
    
    init: function Hero(state) {
      state = typeof state !== 'undefined' ? state : {};
      this._super(state);
      this.currentMovement = state.currentMovement || this.currentMovement || this.directions.STAND;
      this.setMovement(this.currentMovement);
      this.currentDirection = state.currentDirection || this.currentDirection || this.directions.DOWN;
      this.currentAnimation = state.currentAnimation || this.currentAnimation || this.animationTypes.STAND;
      this.currentFrame = state.currentFrame || this.currentFrame || 0;
      
      if (this.animations === null) {
        animations = [[], [], [], [], []];
        this.addAnimation(this.directions.LEFT, this.animationTypes.STAND, [0], true);
        this.addAnimation(this.directions.LEFT, this.animationTypes.WALK, [1, 2], true);
        this.addAnimation(this.directions.LEFT, this.animationTypes.ATTACK, [3, 4], false);
        this.addAnimation(this.directions.TOP, this.animationTypes.STAND, [5], true);
        this.addAnimation(this.directions.TOP, this.animationTypes.WALK, [6, 7], true);
        this.addAnimation(this.directions.TOP, this.animationTypes.ATTACK, [8, 9], false);
        this.addAnimation(this.directions.RIGHT, this.animationTypes.STAND, [10], true);
        this.addAnimation(this.directions.RIGHT, this.animationTypes.WALK, [11, 12], true);
        this.addAnimation(this.directions.RIGHT, this.animationTypes.ATTACK, [13, 14], false);
        this.addAnimation(this.directions.DOWN, this.animationTypes.STAND, [15], true);
        this.addAnimation(this.directions.DOWN, this.animationTypes.WALK, [16, 17], true);
        this.addAnimation(this.directions.DOWN, this.animationTypes.ATTACK, [18, 19], false);
      }
    },

    update: function update() {
      this.setMovement(this.currentMovement);
      this.currentFrame++;
      if (this.currentFrame > animations[this.currentDirection][this.currentAnimation].frames.length) {
        if (!animations[this.currentDirection][this.currentAnimation].loop) {
          this.currentAnimation = this.animationTypes.STAND;
        }
        this.currentFrame = 0;
      }
      
      this.x += this.vx;
      this.y += this.vy;
    },
    
    addAnimation: function addAnimation(direction, animationType, frames,currentDirection, loop) {
      animations[direction][animationType] = {
        frames: frames,
        loop: loop
      };
    },
    
    setAnimation: function setAnimation(animationType) {
      this.currentAnimation = animationType;
      this.currentFrame = 0;
    },
    
    setDirection: function setDirection(direction) {
      if (direction === this.directions.STAND) {
        direction = this.currentDirection;
      } else if (direction > 4) {
        direction -= 4;
      }
      this.currentDirection = direction;
      this.currentFrame = 0;
    },
    
    getCurrentFrame: function getCurrentFrame() {
      return animations[this.currentDirection][this.currentAnimation].frames[this.currentFrame];
    },

    setMovement: function setMovement(direction) {
      var vx = 0;
      var vy = 0;
      
      if (direction === this.directions.LEFT
          || direction === this.directions.TOP_LEFT
          || direction === this.directions.DOWN_LEFT) {
        vx -= this.movespeed;
      }
      if (direction === this.directions.TOP
          || direction === this.directions.TOP_LEFT
          || direction === this.directions.TOP_RIGHT) {
        vy -= this.movespeed;
      }
      if (direction === this.directions.RIGHT
          || direction === this.directions.TOP_RIGHT
          || direction === this.directions.DOWN_RIGHT) {
        vx += this.movespeed;
      }
      if (direction === this.directions.DOWN
          || direction === this.directions.DOWN_LEFT
          || direction === this.directions.DOWN_RIGHT) {
        vy += this.movespeed;
      }
      
      this.vx = vx;
      this.vy = vy;

      this.setDirection(direction);
    },
    
    getPosition: function getPosition() {
      var obj = {
          x: this.x,
          y: this.y
      };
      return obj;
    }
  });

})(typeof global === "undefined" ? window : exports);