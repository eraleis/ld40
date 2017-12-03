import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.image('background', 'assets/images/background.png')
    this.load.image('weed', 'assets/images/weed.png')
    this.load.image('home', 'assets/images/home.png')
    this.load.image('block', 'assets/images/block.png')
    this.load.image('reset', 'assets/images/reset.png')
    this.load.spritesheet('player', 'assets/images/player.png', 60, 64, 5)
    this.load.spritesheet('cop', 'assets/images/cop.png', 60, 64, 5)
  }

  create () {
    this.state.start('Game')
  }
}
