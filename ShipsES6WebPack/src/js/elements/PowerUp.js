import Rectangle from "./Rectangle";
import { ctx } from './Canvas';

export default class PowerUp extends Rectangle {
    constructor(x, y, width, height, type, health) {
        super(x, y, width, height, type, health);
    }

    render() {
        if (this.type == 1) {
            ctx.fillStyle = '#ffff00';
            this.fill(ctx);
            // this.drawImage(ctx, Ship.Game.gun)
        }
        else {
            ctx.fillStyle = '#99ff33';
            this.fill(ctx);
            // this.drawImage(ctx, Ship.Game.star)
        }
    }
}