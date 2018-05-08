'use strict'

var Ship = Ship || {}
var spritesheet = new Image();
spritesheet.src = 'assets/spritesheet.png'
//This is the constructor
Ship.Game = function () {

}

Ship.Game.prototype = {

  constructor: Ship.Game,

  init: function () {

    this.canvas = null
    this.ctx = null
    this.state = 'playing'
    this.canvas = document.getElementById('canvas')
    this.ctx = canvas.getContext('2d')
    this.player = new Ship.Player(90, 290, 10, 10, 0, 3)
    this.enemies = []
    this.enemies.push(new Ship.Enemy(10, 0, 10, 10, 0, 2))
    this.enemies.push(new Ship.Enemy(60, 0, 10, 10, 0, 2))
    this.enemies.push(new Ship.Enemy(120, 0, 10, 10, 0, 2))
    this.enemies.push(new Ship.Enemy(180, 0, 10, 10, 0, 2))
    this.enemies.push(new Ship.Enemy(-10, 0, 10, 10, 0, 2))
    this.enemies.push(new Ship.Enemy(50, 0, 10, 10, 0, 2))
    this.enemies.push(new Ship.Enemy(110, 0, 10, 10, 0, 2))
    this.enemies.push(new Ship.Enemy(170, 0, 10, 10, 0, 2))
    this.enemies.push(new Ship.Enemy(-20, 0, 10, 10, 0, 2))
    this.enemies.push(new Ship.Enemy(40, 0, 10, 10, 0, 2))
    this.enemies.push(new Ship.Enemy(100, 0, 10, 10, 0, 2))
    this.enemies.push(new Ship.Enemy(160, 0, 10, 10, 0, 2))
    this.shots = []
    this.stars = []
    for (var i = 0; i < 200; i++) {
      this.stars.push(new Ship.Star(mathRandom(canvas.width), mathRandom(canvas.height)))
    }
    this.score = 0
    this.update()

  },

  update: function () {
    this.render()

    this.changeState()

    this.resume()

    this.pause()

    setTimeout((this.update.bind(this)), 40)
  },

  render: function () {

    //Canvas:
    this.ctx.fillStyle = '#000'
    this.ctx.fillRect(0, 0, canvas.width, canvas.height)

    //Player:
    this.player.render(this.ctx)

    //Enemy:
    for (var i = 0, l = this.enemies.length; i < l; i++) {
      this.enemies[i].render(this.ctx);
    }

    //Shots
    for (i = 0, l = this.shots.length; i < l; i++) {
      this.shots[i].render(this.ctx);
    }

    //Stars
    for (i = 0, l = this.stars.length; i < l; i++) {
      this.stars[i].render(this.ctx);
    }

    // Draw score
    this.ctx.fillStyle = '#fff'
    this.ctx.textAlign = 'left'
    this.ctx.fillText('Score: ' + this.score, 10, 20)

    // Health
    this.ctx.fillStyle = '#fff'
    this.ctx.textAlign = 'left'
    this.ctx.fillText('Lives: ' + this.player.health, canvas.width - 45, 20)

    //Pause:
    if (this.state === 'pause') {
      this.ctx.textAlign = 'center';
      this.ctx.fillStyle = 'white';
      this.ctx.fillText('PAUSE', 100, 150);
    }

    //Game Over:
    if (this.state === 'over') {
      this.ctx.textAlign = 'center';
      this.ctx.fillStyle = 'white';
      this.ctx.fillText('GAME OVER', 100, 150);
    }

  },

  resume: function () {

    if (this.state === 'playing') {
      //Move stars
      for (var i = 0, l = this.stars.length; i < l; i++) {
        this.stars[i].update()
      }

      //Update Player
      this.player.update()

      //Shots intersects Enemy  
      this.enemyAction()

      for (var i = 0, l = this.shots.length; i < l; i++) {
        this.shots[i].update();
        if (this.shots[i].y < 0) {
          this.shots.splice(i--, 1)
          l--
        }
      }
    }
  },

  pause: function () {
    Keyboard.lastPress = null
  },

  changeState: function () {
    if (Keyboard.lastPress === Keyboard.KEY_ENTER) {
      if (this.state === 'pause') {
        this.state = 'playing'
      }
      else if (this.state === 'playing') {
        this.state = 'pause'
      }
      else if (this.state === 'over' && Keyboard.lastPress === Keyboard.KEY_ENTER) {
        this.createArena();
        this.state = 'playing';
      }
    }
  },

  enemyAction: function () {
    for (var i = 0, l = this.enemies.length; i < l; i++) {
      this.enemies[i].update();

      for (var j = 0, ll = this.shots.length; j < ll; j++) {
        if (this.shots[j].rectCollision(this.enemies[i])) {
          this.enemies[i].health--
          if (this.enemies[i].health == 0) {
            this.score++
            this.enemies[i].x = mathRandom(canvas.width / 10) * 10
            this.enemies[i].y = 0
            this.enemies[i].health = 2
            this.enemies.push(new Ship.Enemy(mathRandom(canvas.width / 10) * 10, 0, 10, 10, 0, 2))
          }
          else {
            this.enemies[i].timer = 1
          }
          this.shots.splice(j--, 1)
          ll--
        }
      }
    }
  },

  createArena: function () {

    this.canvas = null;
    this.ctx = null
    this.gameover = false;
    this.state = 'playing'
    this.stars = []
    this.canvas = document.getElementById('canvas')
    this.ctx = canvas.getContext('2d')
    this.score = 0;
    this.enemies = []
    this.powerups = []
    this.shots = []
    this.star = new Image()
    this.gun = new Image()
    this.gun.src = 'assets/gun.png'
    this.star.src = 'assets/star.png'
    this.player = new Ship.Player(90, 290, 10, 10, 0, 3);
    this.enemies.push(new Ship.Enemy(10, 20, 10, 10, 0, 2))
    this.enemies.push(new Ship.Enemy(30, 20, 10, 10, 0, 2))
    this.enemies.push(new Ship.Enemy(50, 20, 10, 10, 0, 2))
    this.enemies.push(new Ship.Enemy(80, 0, 10, 10, 0, 2))
    this.enemies.push(new Ship.Enemy(100, 0, 10, 10, 0, 2))
    this.enemies.push(new Ship.Enemy(120, 0, 10, 10, 0, 2))
    this.enemies.push(new Ship.Enemy(150, 20, 10, 10, 0, 2))
    this.enemies.push(new Ship.Enemy(170, 20, 10, 10, 0, 2))
    this.enemies.push(new Ship.Enemy(190, 20, 10, 10, 0, 2))
  }
}