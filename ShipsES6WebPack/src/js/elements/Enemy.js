import Rectangle from "./Rectangle";
import MathRandom from '../utils/MathRandom';
import { canvas, ctx } from './Canvas';

export default class Enemy extends Rectangle {
    constructor(x, y, width, height, type, health) {
        super(x, y, width, height, type, health);
    }

    update() {
        // Move Enemy:
        this.moveEnemy();
    }

    render() {
        //Draw Enemy
        if (this.timer % 2 == 0) {
            ctx.fillStyle = 'blue';
            this.fill(ctx);
        } else {
            ctx.fillStyle = 'white';
            this.fill(ctx);
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

    intersectPlayer() {
        if (this.intersects(Ship.Game.player) && Ship.Game.player.timer == 0) {
            Ship.Game.player.health -= 1
            Ship.Game.player.timer = 20
        }
    }
}