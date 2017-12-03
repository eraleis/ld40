import Phaser from 'phaser'

export default class extends Phaser.Text {
  constructor ({ game, x, y, text }) {
    super(game, x, y, text)
    this.fixedToCamera = true
    game.add.existing(this)
  }

  create () {
    this.font = 'Bangers'
    this.padding.set(10, 16)
    this.fontSize = 120
    this.fill = '#000000'
    this.smoothed = false
  }

  setScore (newScore) { this.setText(`Score: ${newScore}`) }
}
