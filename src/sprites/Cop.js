import Phaser from 'phaser'
import { map, BLOCK_SIZE, HEIGHT } from '../data/Map'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    game.add.existing(this)

    this.anchor.setTo(0.5, 1)
    this.body.setSize(22, this.height, 22, 0)
    this.scale.set(-1, 1)

    this.body.velocity.x = 100

    this.props = { power: 2 }
    this.state = {}
    this.overlaping = false

    this.animations.add('walk', [0, 1, 2, 1, 0, 3, 4, 3], 10, true)
    this.animations.play('walk')
  }

  canMove () {
    let index = parseInt(this.x / BLOCK_SIZE)
    let y = Math.abs(parseInt((this.y - game.height) / BLOCK_SIZE))
    console.log(HEIGHT - y, HEIGHT - 1)
    let direction = this.body.velocity.x >= 0 ? 1 : -1
    let next = map[HEIGHT - y][index + direction]
    if (next === 0 || next === undefined) { return false }
    return true
  }

  reverse () {
    this.body.velocity.x *= -1
    this.x += this.body.velocity.x > 0 ? 10 : -10
    this.scale.set(this.scale.x *= -1, this.scale.y)
  }

  onOverlap (callback) {
    callback()
  }

  update () {
    if (!this.canMove()) { this.reverse() }
  }
}
