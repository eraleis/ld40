import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    game.add.existing(this)

    this.anchor.setTo(0.5)
    this.scale.set(0.1)
    this.body.gravity.y = 2000

    this.props = { }
    this.state = { }
  }
}
