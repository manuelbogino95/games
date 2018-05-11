import Rectangle from "./Rectangle";
import { ctx } from './Canvas';

export default class PowerUp extends Rectangle {
    constructor(x, y, width, height, type, health) {
        super(x, y, width, height, type, health);
    }

    render(gunImg, starImg) {
        if (this.type == 1) {
            ctx.strokeStyle = '#f90'
            this.drawImage(ctx, gunImg)
        }
        else {
            ctx.strokeStyle = '#cc6'
            this.drawImage(ctx, starImg)
        }
    }
}