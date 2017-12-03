import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    game.add.existing(this)

    this.scale.set(0.2)

    this.animations.add('explode', [], 15, true)
  }

  static onOverlap () { this.animations.play('explode') }

  canMove () {}
  reverse () {}
}
