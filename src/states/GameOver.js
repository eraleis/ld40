import Phaser from 'phaser'
import ResetButton from '../sprites/Reset'
import BackButton from '../sprites/Back'

export default class extends Phaser.State {
  init (score) {
    this.score = score
    this.stage.backgroundColor = '#000033'
  }

  preload () {}

  gameOverTitle () {
    let bannerText = 'GAME OVER!'
    let banner = this.add.text(this.game.width / 2, this.game.height / 2.7, bannerText)
    banner.font = 'Shrikhand'
    banner.padding.set(10, 16)
    banner.fontSize = 100
    banner.fill = '#FFFFFF'
    banner.smoothed = false
    banner.anchor.setTo(0.5)
  }

  create () {
    let scoreText = `${this.score}`
    let score = this.add.text(this.game.width / 2, this.game.height / 6, scoreText)
    score.font = 'Shrikhand'
    score.fontSize = 100
    score.fill = '#ffffff'
    score.anchor.setTo(1, 0.5)
    score.smoothed = false

    this.coin = this.game.add.sprite(this.game.width / 2 + 110, this.game.height / 6, 'coin')
    this.coin.animations.add('rotate', [], 10, true)
    this.coin.animations.play('rotate')
    this.coin.anchor.setTo(0.5)

    this.coin.scale.set(0.9)
    this.gameOverTitle()

    this.backButton = new BackButton({
      game: this.game,
      x: this.game.width / 2,
      y: this.game.height / 3 + 300,
      asset: 'back'
    })

    this.resetButton = new ResetButton({
      game: this.game,
      x: this.game.width / 2,
      y: this.game.height / 1.6,
      asset: 'reset'
    })

    this.resetButton.events.onInputDown.add(ResetButton.onClick, this)
    this.backButton.events.onInputDown.add(BackButton.onClick, this)
  }

  update () {}

  render () {}
}
