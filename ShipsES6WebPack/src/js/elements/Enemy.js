import Rectangle from "./Rectangle";
import MathRandom from '../utils/MathRandom';
import { canvas, ctx } from './Canvas';

export default class Enemy extends Rectangle {
    constructor(x, y, width, height, type, health) {
        super(x, y, width, height, type, health);
    }

    update(player) {
        this.moveEnemy();
        this.intersectPlayer(player);
    }

    render(spritesheet) {
        if (this.timer % 2 == 0) {
            ctx.strokeStyle = '#00f';
            this.drawImageArea(ctx, spritesheet, 30, 0, 10, 10);
        } else {
            ctx.strokeStyle = '#fff';
            this.drawImageArea(ctx, spritesheet, 40, 0, 10, 10);
        }
    }

    moveEnemy() {
        // Move Enemy    
        this.y += 2;
        if (this.timer > 0)
            this.timer--;
        if (this.y > canvas.height) {
            this.x = MathRandom.mathRandom(canvas.width / 10) * 10;
            this.y = 0;
        }
    }

    intersectPlayer(player) {
        if (this.intersects(player) && player.timer == 0) {
            player.health -= 1;
            player.timer = 20;
        }
    }
}