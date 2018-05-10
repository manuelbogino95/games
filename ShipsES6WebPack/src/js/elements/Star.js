import { ctx } from './Canvas';

export default class Star {
    constructor(x, y) {
        this.x = (x === undefined) ? 0 : x
        this.y = (y === undefined) ? 0 : y
    }

    update() {
        //Move stars
        this.moveStars()
    }

    render() {
        // Draw Stars
        ctx.fillStyle = '#fff';
        ctx.fillRect(this.x, this.y, 1, 1);
    }

    moveStars() {
        // Move Stars
        this.y++
        if (this.y > canvas.height) {
            this.y = 0
        }
    }
}