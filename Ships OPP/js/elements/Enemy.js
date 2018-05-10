'use strict'

var Ship = Ship || {}

//This is the constructor
Ship.Enemy = function (x, y, width, height, type, health) {
  this.x = (x === undefined) ? 0 : x
  this.y = (y === undefined) ? 0 : y
  this.width = (width === undefined) ? 0 : width
  this.height = (height === undefined) ? this.width : height
  this.type = (type === undefined) ? 1 : type
  this.health = (health === undefined) ? 1 : health
  this.timer = 0
  this.elapsedTime = 0
}

Ship.Enemy.prototype = {
  constructor: Ship.Enemy,

  update: function () {
    // Move Enemy:
    this.moveEnemy()
    
    //Intersects Player
    this.intersectPlayer()
  },

  render: function (ctx) {
    //Draw Enemy
    if (this.timer % 2 == 0) {
      ctx.strokeStyle = '#00f';
      this.drawImageArea(ctx, spritesheet, 30, 0, 10, 10);
      // ctx.fillStyle = 'green'
    } else {
      ctx.strokeStyle = '#fff';
      this.drawImageArea(ctx, spritesheet, 40, 0, 10, 10);
      // ctx.fillStyle = 'white'
    }
  },

  moveEnemy: function () {
    // Move Enemy    
    this.y += 2;
    if (this.timer > 0)
      this.timer--
    if (this.y > canvas.height) {
      this.x = mathRandom(canvas.width / 10) * 10;
      this.y = 0;
    }    
  },

  intersectPlayer: function () {
    if(this.intersects(Ship.Game.player) && Ship.Game.player.timer == 0){
      Ship.Game.player.health -= 1
      Ship.Game.player.timer = 20    
    }
  },

  intersects: function (rect) {
    if (rect === undefined) {
      window.console.warn('Missing parameters on function intersects')
    }
    else {
      return (this.x < rect.x + rect.width &&
        this.x + this.width > rect.x &&
        this.y < rect.y + rect.height &&
        this.y + this.height > rect.y)
    }
  },

  drawImageArea: function (ctx, img, sx, sy, sw, sh) {
    if (img.width)
      ctx.drawImage(img, sx, sy, sw, sh, this.x, this.y, this.width, this.height);
    else
      ctx.strokeRect(this.x, this.y, this.width, this.height);
  },

}