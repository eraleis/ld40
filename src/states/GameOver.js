import Phaser from 'phaser'
import ResetButton from '../sprites/Reset'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#000033'
  }

  preload () {}

  gameOverTitle () {
    let bannerText = 'GAME OVER!'
    let banner = this.add.text(this.game.width / 2, this.game.height / 3, bannerText)
    banner.font = 'Shrikhand'
    banner.padding.set(10, 16)
    banner.fontSize = 100
    banner.fill = '#FFFFFF'
    banner.smoothed = false
    banner.anchor.setTo(0.5)
  }

  create () {
    this.gameOverTitle()

    this.resetButton = new ResetButton({
      game: this.game,
      x: this.game.width / 2,
      y: this.game.height / 1.6,
      asset: 'reset'
    })

    this.resetButton.events.onInputDown.add(ResetButton.onClick, this)
  }

  update () {}

  render () {}
}
