import Rectangle from "./Rectangle";
import { ctx } from './Canvas';

export default class Shot extends Rectangle {
    constructor(x, y, width, height, type, health) {
        super(x, y, width, height, type, health);
    }

    update() {
        // Move Shots:
        this.moveShots()
    }

    render() {
        // Draw Shots
        ctx.fillStyle = 'red';
        this.fill(ctx);
    }

    moveShots() {
        // Move Shots
        this.y -= 10
    }
}