class Player {
    constructor(x, y, width, height, type, health) {
        this.x = (x === undefined) ? 0 : x
        this.y = (y === undefined) ? 0 : y
        this.width = (width === undefined) ? 0 : width
        this.height = (height === undefined) ? this.width : height
        this.type = (type === undefined) ? 1 : type
        this.health = (health === undefined) ? 1 : health
        this.timer = 0
        this.elapsedTime = 0
        this.multiShot = 1
    }

    update() {

    }

    render(ctx) {
        this.drawImageArea(ctx, spritesheet, (~~(this.elapsedTime * 10) % 3) * 10, 0, 10, 10);
    }

    drawImageArea(ctx, img, sx, sy, sw, sh) {
        if (img.width)
            ctx.drawImage(img, sx, sy, sw, sh, this.x, this.y, this.width, this.height);
        else
            ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}