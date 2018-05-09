import { Rectangle } from './Rectangle'

export class Player extends Rectangle {
    constructor(x, y, width, height, type, health) {
        super(x, y, width, height, type, health);
    }

    update(keyboard) {
        console.log(keyboard);
        this.movePlayer(keyboard);
    }

    movePlayer(keyboard) {
        // Move Player        
        if (keyboard.pressing[keyboard.KEY_UP]) {
            this.y -= 10;
        }
        if (keyboard.pressing[keyboard.KEY_RIGHT]) {
            debugger;
            this.x += 10;
        }
        if (keyboard.pressing[keyboard.KEY_DOWN]) {
            this.y += 10;
        }
        if (keyboard.pressing[keyboard.KEY_LEFT]) {
            this.x -= 10;
        }
    }
}