import Player from './elements/Player.js';
import Enemy from './elements/Enemy.js';
import Star from './elements/Star';
import PowerUp from './elements/PowerUp';
import { keyboard } from './utils/Keyboard.js';
import { canvas, ctx } from './elements/Canvas';
import MathRandom from './utils/MathRandom';

export default class Game {
    constructor() {
        this.spritesheet = new Image();
        this.spritesheet.src = '../../ShipsES6WebPack/src/assets/spritesheet.png';
        this.player = null;
        this.enemies = [];
        this.stars = [];
        this.powerups = [];
        this.state = 'playing';
        this.gameOver = false;
    }

    init() {
        this.createArena();
        this.update();
    }

    update() {
        this.render();
        this.changeState();
        this.resume();
        this.pause();
        this.checkPlayerHealth();
        setTimeout((this.update.bind(this)), 40);
    }

    render() {
        //Canvas:
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        //Draw Player
        this.player.drawImageArea(ctx,this.spritesheet, 0, 0, 10, 10)

        //Draw Enemies
        for (let i = 0, l = this.enemies.length; i < l; i++) {
            this.enemies[i].drawImageArea(ctx, this.spritesheet, 30, 0, 10, 10)
        }

        //Draw Shots
        for (let i = 0, l = this.player.shots.length; i < l; i++) {
            this.player.shots[i].drawImageArea(ctx, this.spritesheet, 70, 0, 10, 10);
        }

        //Stars
        for (let i = 0, l = this.stars.length; i < l; i++) {
            this.stars[i].render();
        }

        // PowerUps
        // for (let i = 0, l = this.powerups.length; i < l; i++) {
        //     this.powerups[i].render(this.ctx);
        // }

        // Draw score
        ctx.fillStyle = '#fff'
        ctx.textAlign = 'left'
        ctx.fillText('Score: ' + this.player.score, 10, 20)

        // Health
        ctx.fillStyle = '#fff'
        ctx.textAlign = 'left'
        ctx.fillText('Lives: ' + this.player.health, canvas.width - 45, 20)

        //Pause:
        if (this.state === 'pause') {
            ctx.textAlign = 'center';
            ctx.fillStyle = 'white';
            ctx.fillText('PAUSE', 100, 150);
        }

        //Game Over:
        if (this.state === 'over') {
            ctx.textAlign = 'center';
            ctx.fillStyle = 'white';
            ctx.fillText('GAME OVER', 100, 150);
        }
    }

    resume() {
        if (this.state === 'playing') {
            //Move stars
            for (let i = 0, l = this.stars.length; i < l; i++) {
                this.stars[i].update()
            }

            //Update Player
            this.player.update();
            this.enemyAction();
            for (let i = 0, l = this.player.shots.length; i < l; i++) {
                this.player.shots[i].update();
                if (this.player.shots[i].y < 0) {
                    this.player.shots.splice(i--, 1)
                    l--
                }
            }
        }
    }

    changeState() {
        if (keyboard.lastPress === keyboard.KEY_ENTER) {
            if (this.state === 'pause') {
                this.state = 'playing'
            }
            else if (this.state === 'playing') {
                this.state = 'pause'
            }
            else if (this.state === 'over' && keyboard.lastPress === keyboard.KEY_ENTER) {
                this.createArena();
                this.state = 'playing';
            }
        }
    }

    pause() {
        keyboard.lastPress = null
    }

    checkPlayerHealth() {
        if (this.player.health == 0) {
            this.state = 'over';
        }
    }

    enemyAction() {
        for (let i = 0, l = this.enemies.length; i < l; i++) {
            this.enemies[i].update(this.player);
            // Check if enemy got shot
            for (let j = 0, ll = this.player.shots.length; j < ll; j++) {
                if (this.player.shots[j].rectCollision(this.enemies[i])) {
                    this.enemies[i].health--
                    if (this.enemies[i].health == 0) {
                        this.player.score++
                        // Add PowerUp
                        var r = MathRandom.mathRandom(20);
                        if (r < 5) {
                            if (r == 0)    // New MultiShot
                                this.powerups.push(new PowerUp(this.enemies[i].x, this.enemies[i].y, 10, 10, 1));
                            else        // New ExtraPoints
                                this.powerups.push(new PowerUp(this.enemies[i].x, this.enemies[i].y, 10, 10, 0));
                        }
                        this.enemies[i].x = MathRandom.mathRandom(canvas.width / 10) * 10
                        this.enemies[i].y = 0
                        this.enemies[i].health = 2
                        this.enemies.push(new Enemy(MathRandom.mathRandom(canvas.width / 10) * 10, 0, 10, 10, 0, 2))
                    }
                    else {
                        this.enemies[i].timer = 1
                    }
                    this.player.shots.splice(j--, 1)
                    ll--
                }
            }
        }
    }

    createArena() {
        this.gameover = false;
        this.state = 'playing'
        this.player = new Player(90, 290, 10, 10, 0, 3);
        this.enemy = new Enemy(90, 290, 10, 10, 0, 3);
        this.score = 0;
        this.enemies = [];
        this.powerups = [];
        this.stars = [];
        for (var i = 0; i < 200; i++) {
            this.stars.push(new Star(MathRandom.mathRandom(canvas.width), MathRandom.mathRandom(canvas.height)))
        }
        // this.star = new Image()
        // this.gun = new Image()
        // this.gun.src = 'assets/gun.png'
        // this.star.src = 'assets/star.png'
        this.enemies.push(new Enemy(30, 20, 10, 10, 0, 2))
        this.enemies.push(new Enemy(10, 20, 10, 10, 0, 2))
        this.enemies.push(new Enemy(50, 20, 10, 10, 0, 2))
        this.enemies.push(new Enemy(80, 0, 10, 10, 0, 2))
        this.enemies.push(new Enemy(100, 0, 10, 10, 0, 2))
        this.enemies.push(new Enemy(120, 0, 10, 10, 0, 2))
        this.enemies.push(new Enemy(150, 20, 10, 10, 0, 2))
        this.enemies.push(new Enemy(170, 20, 10, 10, 0, 2))
        this.enemies.push(new Enemy(190, 20, 10, 10, 0, 2))
    }
}