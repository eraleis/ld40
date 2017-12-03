import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    game.add.existing(this)

    this.anchor.setTo(0, 1)
    this.scale.set(0.2)
    this.y += 28
    this.x -= 34
    this.overlaping = false

    this.props = { power: 4 }
    this.explosion_sound = game.add.audio('explosion_sound');

    this.animations.add('explode', [], 25, false)
  }

  onOverlap (callback) {
    var self = this

    if (this.overlaping && this.frame >= 15) { callback() }
    if (!this.overlaping) {
      setTimeout(function () { self.explosion_sound.play() }, 800)
    }
    this.overlaping = true
    this.animations.play('explode')
    this.events.onAnimationComplete.add(_ => {
      this.kill()
    })
  }
}
