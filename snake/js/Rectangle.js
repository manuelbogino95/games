function Rectangle(x, y, width, height) {
  this.x = (x === undefined) ? 0 : x;
  this.y = (y === undefined) ? 0 : y;
  this.width = (width === undefined) ? 0 : width;
  this.height = (height === undefined) ? width : height;
}

Rectangle.prototype = {
  constructor: Rectangle,

  intersects: function(rect) {
    if(rect === undefined) {
      window.console.warn('Missing parameters on function intersects');
    } else {
      return (this.x < rect.x + rect.width &&
          this.x + this.width > rect.x &&
          this.y < rect.y + rect.height &&
          this.y + this.height > rect.y);
    }
  },

  fill: function(ctx) {
    if(ctx === undefined) {
      window.console.warn('Missing parameters on function fill');
    } else {
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  },

  drawImage: function(ctx, img) {
    if(img === undefined) {
      window.console.warn('Missing parameters on function draw image');
    } else {
      if(img.width) {
        ctx.drawImage(img, this.x, this.y);
      } else {
        ctx.strokeRect(this.x, this.y, this.width, this.height);
      }
    }
  }
};
