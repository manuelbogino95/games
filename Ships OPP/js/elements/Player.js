'use strict'

var Ship = Ship || {}

//This is the constructor
Ship.Player = function (x, y, width, height, type, health) {

  this.x = (x === undefined) ? 0 : x
  this.y = (y === undefined) ? 0 : y
  this.width = (width === undefined) ? 0 : width
  this.height = (height === undefined) ? this.width : height
  this.type = (type === undefined) ? 1 : type
  this.health = (health === undefined) ? 1 : health
  this.timer = 0
  this.elapsedTime = 0
  this.multiShot = 1

}

Ship.Player.prototype = {

  constructor: Ship.Player,

  init: function () {

  },

  update: function () {

    // Move Player:
    this.movePlayer()

    this.checkShots()

    this.checkPosition()

    this.checkPowerUps()

  },

  render: function (ctx) {
    this.drawImageArea(ctx, spritesheet, (~~(this.elapsedTime * 10) % 3) * 10, 0, 10, 10);
  },

  movePlayer: function () {
    // Move Player
    if (Keyboard.pressing[Keyboard.KEY_UP]) {
      this.y -= 10;
    }
    if (Keyboard.pressing[Keyboard.KEY_RIGHT]) {
      this.x += 10;
    }
    if (Keyboard.pressing[Keyboard.KEY_DOWN]) {
      this.y += 10;
    }
    if (Keyboard.pressing[Keyboard.KEY_LEFT]) {
      this.x -= 10;
    }
  },

  checkShots: function () {
    if (Keyboard.lastPress == Keyboard.KEY_SPACE) {
      if (this.multiShot == 3) {
        Ship.Game.shots.push(new Ship.Shot(this.x, this.y, 5, 5))
        Ship.Game.shots.push(new Ship.Shot(this.x + 5, this.y, 5, 5))
        Ship.Game.shots.push(new Ship.Shot(this.x + 9, this.y + 2, 5, 5))
      } else if (this.multiShot == 2) {
        Ship.Game.shots.push(new Ship.Shot(this.x, this.y, 5, 5))
        Ship.Game.shots.push(new Ship.Shot(this.x + 5, this.y, 5, 5))
      } else {
        Ship.Game.shots.push(new Ship.Shot(this.x + 3, this.y, 5, 5))
      }
      Keyboard.lastPress = null
    }
  },

  checkPosition: function () {

    if (this.x > canvas.width - 10) {
      this.x = canvas.width - 10;
    }
    if (this.x < 0) {
      this.x = 0
    }

    if (this.y > canvas.height - 10) {
      this.y = canvas.height - 10;
    }
    if (this.y < 0) {
      this.y = 0
    }

    if (Ship.Game.player.timer > 0) {
      Ship.Game.player.timer = Ship.Game.player.timer - 1
    }

    if (Ship.Game.player.health == 0) {
      Ship.Game.state = 'over';
    }
  },

  checkPowerUps: function () {
    // PowerUps
    for (var i = 0, l = Ship.Game.powerups.length; i < l; i++) {
      Ship.Game.powerups[i].y += 5
      // Powerup Outside Screen
      if (Ship.Game.powerups[i].y > canvas.height) {
        Ship.Game.powerups.splice(i--, 1)
        l--;
        continue;
      }
      if (this.intersects(Ship.Game.powerups[i])) {
        if (Ship.Game.powerups[i].type == 1) { // MultiShot
          if (this.multiShot < 3) {
            Ship.Game.player.multiShot++;
            // messages.push(new Message('MULTI', this.x - (this.width / 2), this.y - 15))
          }
          else {
            Ship.Game.score += 5;
            // messages.push(new Message('+5', this.x - (this.width / 2), this.y - 15))
          }
        }
        else { // ExtraPoints
          Ship.Game.score += 5;
          // messages.push(new Message('+5', this.x - (this.width / 2), this.y - 15))
        }
        Ship.Game.powerups.splice(i--, 1);
        l--;
      }
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

