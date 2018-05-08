import { Keyboard }  from './utils/Keyboard.js'
let asd = new Keyboard();
asd.listen();

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

//Canvas:
ctx.fillStyle = '#000'
ctx.fillRect(0, 0, canvas.width, canvas.height)

