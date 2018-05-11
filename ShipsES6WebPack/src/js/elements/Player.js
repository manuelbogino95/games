import Rectangle from './Rectangle';
import Shot from './Shot';
import { keyboard } from '../utils/Keyboard';
import { canvas, ctx } from './Canvas';

export default class Player extends Rectangle {
    constructor(x, y, width, height, type, health) {
        super(x, y, width, height, type, health);

        this.shots = [];
        this.score = 0;
    }

    update() {
        this.movePlayer();
        this.checkShots();
        this.checkPosition();
    }

    render(spritesheet) {
        if (this.timer % 2 == 0)
            this.drawImageArea(ctx, spritesheet, (~~(this.elapsedTime * 10) % 3) * 10, 0, 10, 10);
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
                this.shots.push(new Shot(this.x, this.y, 5, 5));
                this.shots.push(new Shot(this.x + 5, this.y, 5, 5));
                this.shots.push(new Shot(this.x + 9, this.y + 2, 5, 5));
            } else if (this.multiShot == 2) {
                this.shots.push(new Shot(this.x, this.y, 5, 5));
                this.shots.push(new Shot(this.x + 5, this.y, 5, 5));
            } else {
                this.shots.push(new Shot(this.x + 3, this.y, 5, 5));
            }
            keyboard.lastPress = null;
        }
    }

    checkPosition() {
        if (this.x > canvas.width - 10) {
            this.x = canvas.width - 10;
        }
        if (this.x < 0) {
            this.x = 0;
        }

        if (this.y > canvas.height - 10) {
            this.y = canvas.height - 10;
        }
        if (this.y < 0) {
            this.y = 0;
        }

        if (this.timer > 0) {
            this.timer = this.timer - 1;
        }
    }

    checkPowerUp(powerUp) {
        //Check For Range inside Canvas and Intersection
        powerUp.y += 4;
        if (this.intersects(powerUp)) {
            if (powerUp.type == 1) {
                if (this.multiShot < 3) {
                    this.multiShot++;
                }
                else {
                    this.score += 5;
                }
            }
            else {
                this.score += 5;
            }
            return true;
        }
    }
}