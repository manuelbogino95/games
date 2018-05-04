'use strict'

var Ship = Ship || {}

//This is the constructor
Ship.Star = function (x, y) {
    this.x = (x === undefined) ? 0 : x
    this.y = (y === undefined) ? 0 : y
}

Ship.Star.prototype = {
    constructor: Ship.Star,

    update: function () {
        //Move stars
        this.moveStars()
    },

    render: function (ctx) {
        // Draw Stars
        ctx.fillStyle = '#fff';
        ctx.fillRect(this.x, this.y, 1, 1);
    },

    moveStars: function() {
        // Move Stars
        this.y++
        if(this.y>canvas.height) {
          this.y=0
        }    
    }
}