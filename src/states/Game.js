/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'
import GenerateMap from '../services/GenerateMapService'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    let game = this.game

    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.world.enableBody = true
    this.worldGroup = GenerateMap(game)

    this.player = new Player({
      game: this.game,
      x: 20,
      y: this.world.centerY,
      asset: 'mushroom'
    })
    game.camera.follow(this.player)

    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT ])
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(Player.jump, this.player)
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
  }

  update () {
    this.game.physics.arcade.collide(this.player, this.worldGroup)

    if (this.rightKey.isDown) {
      this.player.moveLeft()
    } else if (this.leftKey.isDown) {
      this.player.moveRight()
    } else {
      this.player.stopMove()
    }

    Player.resetJump(this.player)
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 32, 32)
      this.game.debug.cameraInfo(this.game.camera, 120, 120)
    }
  }
}
