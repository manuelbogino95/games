'use strict'

var Ship = Ship || {}

window.onload = function () {
  Keyboard.listen()
  Ship.Game = new Ship.Game()
  Ship.Game.init()
}