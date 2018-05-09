import { Player } from './elements/Player.js'
import { Keyboard } from './utils/Keyboard.js'

export class Game {
    constructor() {
        this.spritesheet = new Image();
        this.spritesheet.src = 'src/assets/spritesheet.png';
        this.canvas = null;
        this.ctx = null;
        this.player = null;
        this.state = 'playing';
        this.keyboard = null;
    }

    init() {

        this.createArena();

        this.update();
        debugger;
        setTimeout((this.update.bind(this)), 40)
    }

    update() {

        this.render();

        this.resume();
    }

    render() {
        //Canvas:
        this.ctx.fillStyle = '#000'
        this.ctx.fillRect(0, 0, canvas.width, canvas.height)

        this.player.fill(this.ctx)
    }

    resume() {

        if (this.state === 'playing') {
            //Move stars
            // for (var i = 0, l = this.stars.length; i < l; i++) {
            //     this.stars[i].update()
            // }

            //Update Player
            console.log(this);
            this.player.update(this.keyboard);

            //Shots intersects Enemy  
            // this.enemyAction()

            // for (var i = 0, l = this.shots.length; i < l; i++) {
            //     this.shots[i].update();
            //     if (this.shots[i].y < 0) {
            //         this.shots.splice(i--, 1)
            //         l--
            //     }
            // }
        }
    }

    createArena() {
        this.canvas = null;
        this.ctx = null
        // this.gameover = false;
        // this.state = 'playing'
        //this.stars = []
        this.canvas = document.getElementById('canvas')
        this.ctx = canvas.getContext('2d')
        this.keyboard = new Keyboard();
        this.keyboard.listen();
        this.player = new Player(90, 290, 10, 10, 0, 3);
        
        this.score = 0;
        // this.enemies = []
        // this.powerups = []
        // this.shots = []
        // this.star = new Image()
        // this.gun = new Image()
        // this.gun.src = 'assets/gun.png'
        // this.star.src = 'assets/star.png'
        // this.player = new Ship.Player(90, 290, 10, 10, 0, 3);
        // this.enemies.push(new Ship.Enemy(30, 20, 10, 10, 0, 2))
        // this.enemies.push(new Ship.Enemy(10, 20, 10, 10, 0, 2))
        // this.enemies.push(new Ship.Enemy(50, 20, 10, 10, 0, 2))
        // this.enemies.push(new Ship.Enemy(80, 0, 10, 10, 0, 2))
        // this.enemies.push(new Ship.Enemy(100, 0, 10, 10, 0, 2))
        // this.enemies.push(new Ship.Enemy(120, 0, 10, 10, 0, 2))
        // this.enemies.push(new Ship.Enemy(150, 20, 10, 10, 0, 2))
        // this.enemies.push(new Ship.Enemy(170, 20, 10, 10, 0, 2))
        // this.enemies.push(new Ship.Enemy(190, 20, 10, 10, 0, 2))
    }
}