import { Keyboard } from './utils/Keyboard.js'
import { Game } from './Game.js'

window.onload = () => {
    let keyboard = new Keyboard();
    keyboard.listen();
    let game = new Game();
    game.init();
}

