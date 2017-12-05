import Phaser from 'phaser'
import Player from '../sprites/Player'

const initializePlayerInput = (game) => {
  game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(Player.jump, game.entities.player)
  game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(Player.jump, game.entities.player)

  let leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
  let rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)

  game.time.events.loop(20, _ => {
    if (rightKey.isDown) {
      game.entities.player.moveRight()
    } else if (leftKey.isDown) {
      game.entities.player.moveLeft()
    } else {
      game.entities.player.moveStop()
    }
  }, this)
}

export { initializePlayerInput }
