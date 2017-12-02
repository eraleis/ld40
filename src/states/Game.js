/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'
import Weed from '../sprites/Weed'
import Home from '../sprites/Home'
import GenerateMap from '../services/GenerateMapService'

const BLOCK_SIZE = 32

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    let game = this.game

    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.world.enableBody = true
    this.worldGroup = GenerateMap(game)

    this.home = new Home({
      game: this.game,
      x: 50,
      y: this.world.height - BLOCK_SIZE,
      asset: 'home'
    })

    this.player = new Player({
      game: this.game,
      x: 55,
      y: 0,
      asset: 'player'
    })

    this.weed = new Weed({
      game: this.game,
      x: this.world.width - 20,
      y: this.world.height - BLOCK_SIZE,
      asset: 'weed'
    })

    game.camera.follow(this.player)

    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT ])
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(Player.jump, this.player)
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
  }

  update () {
    let arcade = this.game.physics.arcade
    arcade.collide(this.player, this.worldGroup)

    arcade.overlap(
      this.player,
      this.weed,
      _ => { this.player.smokeWeed(this.weed) }
    )

    arcade.overlap(
      this.player,
      this.home,
      _ => {
        if (this.player.depositWeed(this.home) === true) {
          let bannerText = 'LEVEL UP !'
          let banner = this.add.text(this.game.width / 2, this.game.height / 2, bannerText)
          banner.font = 'Bangers'
          banner.padding.set(10, 16)
          banner.fontSize = 120
          banner.fill = '#77BFA3'
          banner.smoothed = false
          banner.anchor.setTo(0.5)
        }
      }
    )

    if (this.rightKey.isDown) {
      this.player.moveRight()
    } else if (this.leftKey.isDown) {
      this.player.moveLeft()
    } else {
      this.player.stopMove()
    }

    Player.resetJump(this.player)
  }

  render () {
    if (__DEV__) {
<<<<<<< HEAD
      // this.game.debug.spriteInfo(this.player, 32, 32)
      // this.game.debug.cameraInfo(this.game.camera, 120, 120)
=======
      this.game.debug.spriteInfo(this.player, 32, 32)
      this.game.debug.body(this.player);
      this.game.debug.cameraInfo(this.game.camera, 120, 120)
>>>>>>> Add player animation
    }
  }
}
