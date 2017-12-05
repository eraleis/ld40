import Phaser from 'phaser'
import ResetButton from '../sprites/Reset'

export default class extends Phaser.State {
  init (score) {
    this.score = score
    this.stage.backgroundColor = '#000000'
  }

  create () {
    let gamewinSound = this.game.add.audio('gamewin_sound')
    gamewinSound.play()

    let bannerText = 'YOU WIN !'
    let banner = this.add.text(this.game.width / 2, this.game.height / 2, bannerText)
    banner.font = 'Shrikhand'
    banner.fontSize = 100
    banner.fill = '#ffffff'
    banner.anchor.setTo(0.5)
    banner.smoothed = false

    let scoreText = `${this.score}`
    let score = this.add.text(this.game.width / 2, this.game.height / 4, scoreText)
    score.font = 'Shrikhand'
    score.fontSize = 100
    score.fill = '#ffffff'
    score.anchor.setTo(1, 0.5)
    score.smoothed = false

    this.coin = this.game.add.sprite(this.game.width / 2 + 110, this.game.height / 4, 'coin')
    this.coin.animations.add('rotate', [], 10, true)
    this.coin.animations.play('rotate')
    this.coin.anchor.setTo(0.5)

    this.coin.scale.set(0.9)

    let i = 0
    let colors = ['#5fc9f8', '#fecb2e', '#fc3158', '#147efb', '#53d769', '#fc3d39', '#8e8e93']
    this.game.time.events.loop(100, _ => {
      if (i >= colors.length) { i = 0 }
      banner.fill = colors[i]
      i++
    }, this)

    this.resetButton = new ResetButton({
      game: this.game,
      x: this.game.width / 2,
      y: this.game.height / 1.4,
      asset: 'reset'
    })

    this.resetButton.events.onInputDown.add(ResetButton.onClick, this)
  }
}
