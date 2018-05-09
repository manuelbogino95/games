import Game from './Game.js';
import { keyboard } from './utils/Keyboard.js';

window.onload = () => {    
    keyboard.listen();
    const game = new Game();
    game.init();
}

