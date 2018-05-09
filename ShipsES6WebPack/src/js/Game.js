import { Player } from './elements/Player.js'

export class Game {
    constructor() {
        this.spritesheet = new Image();
        this.spritesheet.src = 'src/assets/spritesheet.png';
        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
        this.player = new Player(90, 290, 10, 10, 0, 3);
    }

    init() {
        this.update();
    }

    update() {
        this.render();
    }

    render() {
        //Canvas:
        this.ctx.fillStyle = '#000'
        this.ctx.fillRect(0, 0, canvas.width, canvas.height)

        this.player.fill(this.ctx)
    }
}