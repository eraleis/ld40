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
    this.load.image('background_sky', 'assets/images/background_sky.png')
    this.load.image('background', 'assets/images/background.png')
    this.load.image('background_sky_high', 'assets/images/background_sky_high.png')
    this.load.image('background_high', 'assets/images/background_high.png')

    this.load.image('weed', 'assets/images/weed.png')
    this.load.image('home', 'assets/images/home.png')
    this.load.image('block_1', 'assets/images/block_1.png')
    this.load.image('block_2', 'assets/images/block_2.png')
    this.load.image('block_3', 'assets/images/block_3.png')
    this.load.image('block_4', 'assets/images/block_4.png')
    this.load.image('block_1_high', 'assets/images/block_1.png')
    this.load.image('block_2_high', 'assets/images/block_2_high.png')
    this.load.image('block_3_high', 'assets/images/block_3_high.png')
    this.load.image('block_4_high', 'assets/images/block_4_high.png')
    this.load.image('reset', 'assets/images/reset.png')
    this.load.image('start', 'assets/images/start.png')
    this.load.image('back', 'assets/images/back.png')
    this.load.spritesheet('bomb', 'assets/images/bomb.png', 512, 512)
    this.load.spritesheet('player', 'assets/images/player.png', 60, 64, 5)
    this.load.spritesheet('cop', 'assets/images/cop.png', 60, 64, 5)
    this.load.spritesheet('coin', 'assets/images/coin.png', 300, 300, 5)
  }

  create () {
    this.state.start('Menu')
  }
}
