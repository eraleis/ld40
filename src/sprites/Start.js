import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    game.add.existing(this)

    this.inputEnabled = true

    this.anchor.setTo(0.5)
    this.scale.set(0.2)
  }

  static onClick () { this.state.start('Game', true, false) }
}
