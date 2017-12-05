import Phaser from 'phaser'
import Player from '../sprites/Player'

const initializePlayerInput = (game) => {
  game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(Player.jump, game.entities.player)
  game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(Player.jump, game.entities.player)

  let leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
  leftKey.onDown.add(game.entities.player.moveLeft, game.entities.player)
  leftKey.onUp.add(game.entities.player.moveStop, game.entities.player)
  let rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
  rightKey.onDown.add(game.entities.player.moveRight, game.entities.player)
  rightKey.onUp.add(game.entities.player.moveStop, game.entities.player)
}

export { initializePlayerInput }
