import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    game.add.existing(this)

    this.anchor.setTo(0.5)
    this.body.setSize(22, this.height, 22, 0)
    this.scale.set(-1, 1)

    this.body.gravity.y = 2000
    this.body.mass = 2

    this.props = { max_jump: 2 }
    this.state = { current_jump: 0, high: false }

    this.animations.add('walk', [0, 1, 2, 1, 0, 3, 4, 3], 15, true)
  }

  static jump () {
    if (this.state.current_jump >= this.props.max_jump) { return }

    this.body.velocity.y = -500
    this.state.current_jump++
  }

  static resetJump (player) {
    if (player.body.velocity.y === 0) {
      player.state.current_jump = 0
    }
  }

  moveLeft () {
    this.body.velocity.x = -200
    this.scale.set(1, 1)
    this.animations.play('walk')
  }

  moveRight () {
    this.body.velocity.x = 200
    this.scale.set(-1, 1)
    this.animations.play('walk')
  }

  stopMove () {
    this.body.velocity.x = 0
    this.animations.stop('walk')
  }

  smokeWeed (weed) {
    this.state.high = true
    weed.kill()
  }

  depositWeed (home) {
    if (this.state.high === true) {
      this.state.high = false
      return true
    } else { return false }
  }
}
