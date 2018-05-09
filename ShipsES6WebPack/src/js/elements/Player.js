import Rectangle from './Rectangle';
import Shot from './Shot';
import { keyboard } from '../utils/Keyboard';
import { ctx } from './Canvas';

export default class Player extends Rectangle {
    constructor(x, y, width, height, type, health) {
        super(x, y, width, height, type, health);

        this.shots = [];
        this.score = 0;
    }

    update() {
        this.movePlayer();

        this.checkShots();
    }

    render() {
        ctx.fillStyle = '#0f0';
        this.fill(ctx);
    }

    movePlayer() {
        // Move Player        
        if (keyboard.pressing[keyboard.KEY_UP]) {
            this.y -= 10;
        }
        if (keyboard.pressing[keyboard.KEY_RIGHT]) {
            this.x += 10;
        }
        if (keyboard.pressing[keyboard.KEY_DOWN]) {
            this.y += 10;
        }
        if (keyboard.pressing[keyboard.KEY_LEFT]) {
            this.x -= 10;
        }
    }

    checkShots() {
        if (keyboard.lastPress == keyboard.KEY_SPACE) {
            if (this.multiShot == 3) {
                this.shots.push(new Shot(this.x, this.y, 5, 5))
                this.shots.push(new Shot(this.x + 5, this.y, 5, 5))
                this.shots.push(new Shot(this.x + 9, this.y + 2, 5, 5))
            } else if (this.multiShot == 2) {
                this.shots.push(new Shot(this.x, this.y, 5, 5))
                this.shots.push(new Shot(this.x + 5, this.y, 5, 5))
            } else {
                this.shots.push(new Shot(this.x + 3, this.y, 5, 5))
            }
            keyboard.lastPress = null
        }
    }    
}