import Phaser from 'phaser'
import { BLOCK_SIZE } from '../data/Map'

export default class extends Phaser.Sprite {
  constructor (game) {
    super(game, 50, game.world.height - BLOCK_SIZE, 'home')
    game.add.existing(this)

    this.anchor.setTo(0.5, 1)
    this.scale.set(0.3)
  }
}
