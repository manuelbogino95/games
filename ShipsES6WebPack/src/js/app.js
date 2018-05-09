import { Keyboard } from './utils/Keyboard.js'
import { Game } from './Game.js'

// window.onload = () => {

// }
let keyboard = new Keyboard();
keyboard.listen();
let game = new Game();
game.init();

// let canvas = document.getElementById('canvas')
// let ctx = canvas.getContext('2d')

// //Canvas:
// ctx.fillStyle = '#000'
// ctx.fillRect(0, 0, canvas.width, canvas.height)

