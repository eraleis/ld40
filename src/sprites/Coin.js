import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    game.add.existing(this)

    this.scale.set(0.2)

    this.y -= 60
    this.x -= 15

    this.body.setSize(120, 180, 90, 70)

    this.animations.add('rotate', [], 10, true)
    this.animations.play('rotate')
  }

  create () {}

  onOverlap (callback) {
    this.kill()
    callback()
  }
}
