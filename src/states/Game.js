/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'

export default class extends Phaser.State {
  init () {}
  preload () {}

  createWorld () {
    let group = this.game.add.group()
    let map = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1]
    ]

    this.game.world.setBounds(0, 0, map[0].length * 32, 600);

    var pos = {x: 0, y: this.world.height}

    for (var i = map.length - 1; i >= 0; i--) {
      pos.x = 0
      for (var j = 0; j < map[i].length; j++) {
        if (map[i][j] === 1) {
          let block = this.game.add.sprite(pos.x, pos.y, 'block')
          group.add(block)
          block.anchor.y = 1
          block.body.immovable = true
        }
        pos.x += 32
      }
      pos.y -= 32
    }
    return group
  }

  create () {
    let game = this.game

    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.world.enableBody = true;
    this.worldGroup = this.createWorld()

    this.player = new Player({
      game: this.game,
      x: 0,
      y: this.world.centerY,
      asset: 'mushroom',
    })

    game.camera.follow(this.player);

    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT])
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(Player.jump, this.player);
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
  }

  update () {
    game.physics.arcade.collide(this.player, this.worldGroup);
    if (this.rightKey.isDown) {
      this.player.body.velocity.x = 200
    } else if (this.leftKey.isDown) {
      this.player.body.velocity.x = -200
    } else {
      this.player.body.velocity.x = 0
    }

    Player.resetJump(this.player)

  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 32, 32)
      this.game.debug.cameraInfo(game.camera, 120, 120)
    }
  }
}
