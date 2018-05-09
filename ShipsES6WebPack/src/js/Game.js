export class Game {
    constructor() {
        this.spritesheet = new Image();
        this.spritesheet.src = 'src/assets/spritesheet.png';
        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
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
    }
}