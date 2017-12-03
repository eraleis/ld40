import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#000000'
  }

  create () {
    let bannerText = 'YOU WIN !'
    let banner = this.add.text(this.game.width / 2, this.game.height / 2, bannerText)
    banner.font = 'Shrikhand'
    banner.fontSize = 100
    banner.fill = '#ffffff'
    banner.anchor.setTo(0.5)
    banner.smoothed = false

    let i = 0
    let colors = ['#5fc9f8', '#fecb2e', '#fc3158', '#147efb', '#53d769', '#fc3d39', '#8e8e93']
    this.game.time.events.loop(100, _ => {
      if (i >= colors.length) { i = 0 }
      banner.fill = colors[i]
      i++
    }, this)
  }
}
