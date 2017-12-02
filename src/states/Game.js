/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    let game = this.game

    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.physics.arcade.gravity.y = 500

    this.player = new Player({
      game: this.game,
      x: 0,
      y: this.world.centerY,
      asset: 'mushroom'
    })
    this.player.enableBody = true

    this.physicsBodyType = Phaser.Physics.ARCADE
    game.physics.enable(this.player, Phaser.Physics.ARCADE)

    this.player.body.collideWorldBounds = true
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)

    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR ])

    game.add.existing(this.player)
  }

  update () {
    if (this.rightKey.isDown) {
      this.player.body.velocity.x = 200
    } else if (this.leftKey.isDown) {
      this.player.body.velocity.x = -200
    } else {
      this.player.body.velocity.x = 0
    }

    if (this.spaceKey.isDown && this.player.body.velocity.y === 0) {
      this.player.body.velocity.y = -200
    }
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 32, 32)
    }
  }
}
