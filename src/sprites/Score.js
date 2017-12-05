import Phaser from 'phaser'

export default class extends Phaser.Text {
  constructor (game) {
    super(game, 50, 50, 'Score: 0')
    this.fixedToCamera = true
    game.add.existing(this)
  }

  create () {
    this.font = 'Bangers'
    this.padding.set(10, 16)
    this.fontSize = 120
    this.fill = '#FFFFFF'
    this.smoothed = false
  }

  setScore (newScore) { this.setText(`Score: ${newScore}`) }
}
