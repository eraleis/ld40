import Phaser from 'phaser'
import { BLOCK_SIZE } from '../data/Map'

export default class extends Phaser.Sprite {
  constructor (game) {
    super(game, game.world.width - 20, game.world.height - BLOCK_SIZE, 'weed')
    game.add.existing(this)

    this.anchor.setTo(0.5, 1)
    this.scale.set(0.1)

    this.props = { }
    this.state = { direction: 1 }

    this.game.time.events.loop(200, _ => {
      this.y += 15 * this.state.direction * -1
      this.state.direction *= -1
    }, this)
  }
}
