import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    game.add.existing(this)

    this.anchor.setTo(0.5)
    this.scale.set(0.4)

    this.body.gravity.y = 2000
    this.body.mass = 2

    this.props = { max_jump: 2 }
    this.state = { current_jump: 0, high: false }
  }

  static jump () {
    if (this.state.current_jump >= this.props.max_jump) {
      return
    }

    this.body.velocity.y = -500
    this.state.current_jump++
  }

  static resetJump (player) {
    if (player.body.velocity.y === 0) {
      player.state.current_jump = 0
    }
  }

  moveLeft () {
    this.body.velocity.x = 200
  }

  moveRight () {
    this.body.velocity.x = -200
  }

  stopMove () {
    this.body.velocity.x = 0
  }

  smokeWeed (weed) {
    this.state.high = true
    weed.kill()
  }
}
