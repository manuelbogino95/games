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

    //Pause:
    if (this.state === 'pause') {
      this.ctx.textAlign = 'center';
      this.ctx.fillStyle = 'white'
      this.ctx.fillText('PAUSE', 150, 75);
      this.ctx.textAlign = 'left';
    }

    //Game Over:
    if (this.state === 'over') {
      this.ctx.textAlign = 'center';
      this.ctx.fillStyle = 'white'
      this.ctx.fillText('GAME OVER', 150, 75);
      this.ctx.textAlign = 'left';
    }

  },

  resume: function () {

    if (this.state === 'playing') {
      this.player.update()

      for (var i = 0, l = this.enemies.length; i < l; i++) {
        this.enemies[i].update();

        for (var j = 0, ll = this.shots.length; j < ll; j++) {
          if (this.shots[j].rectCollision(this.enemies[i])) {
            this.enemies[i].health--
            if (this.enemies[i].health == 0) {
              //score++
              // // Add PowerUp
              // var r = random(20);
              // if (r < 5) {
              //   if (r == 0)    // New MultiShot
              //     powerups.push(new Rectangle(enemies[i].x, enemies[i].y, 10, 10, 1));
              //   else        // New ExtraPoints
              //     powerups.push(new Rectangle(enemies[i].x, enemies[i].y, 10, 10, 0));
              // }
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

  die: function () {
    this.reset()
    this.player.die()
  },

  reset: function () {
    this.createArena()
    this.state = 'playing'
    this.food = new Snake.Food(70, 70, 10, 10)
  },

  changeState: function () {
    if (Keyboard.lastPress === Keyboard.KEY_ENTER) {
      if (this.state === 'pause') {
        this.state = 'playing'
      }
      else if (this.state === 'playing') {
        this.state = 'pause'
      }
      // else if (this.state === 'over') {
      //   this.die()
      // }
    }
  },

  createArena: function () {

    this.canvas = document.getElementById('canvas')
    this.ctx = canvas.getContext('2d')
    // this.walls = new Array()
    // this.walls.push(new Snake.Wall(100, 50, 10, 10))
    // this.walls.push(new Snake.Wall(100, 100, 10, 10))
    // this.walls.push(new Snake.Wall(200, 50, 10, 10))
    // this.walls.push(new Snake.Wall(200, 100, 10, 10))

  }

}