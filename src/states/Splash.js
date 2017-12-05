import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.game.load.setPreloadSprite(this.loaderBar)

    //
    // load your assets
    //
    this.game.load.image('background_sky', 'assets/images/background_sky.png')
    this.game.load.image('background', 'assets/images/background.png')
    this.game.load.image('background_sky_high', 'assets/images/background_sky_high.png')
    this.game.load.image('background_high', 'assets/images/background_high.png')

    this.game.load.image('weed', 'assets/images/weed.png')
    this.game.load.image('home', 'assets/images/home.png')
    this.game.load.image('block_1', 'assets/images/block_1.png')
    this.game.load.image('block_2', 'assets/images/block_2.png')
    this.game.load.image('block_3', 'assets/images/block_3.png')
    this.game.load.image('block_4', 'assets/images/block_4.png')
    this.game.load.image('block_1_high', 'assets/images/block_1.png')
    this.game.load.image('block_2_high', 'assets/images/block_2_high.png')
    this.game.load.image('block_3_high', 'assets/images/block_3_high.png')
    this.game.load.image('block_4_high', 'assets/images/block_4_high.png')
    this.game.load.image('reset', 'assets/images/reset.png')
    this.game.load.image('start', 'assets/images/start.png')
    this.game.load.image('back', 'assets/images/back.png')
    this.game.load.image('arrow_left', 'assets/images/arrow_left.png')
    this.game.load.spritesheet('bomb', 'assets/images/bomb.png', 512, 512)
    this.game.load.spritesheet('player', 'assets/images/player.png', 60, 64, 5)
    this.game.load.spritesheet('cop', 'assets/images/cop.png', 60, 64, 5)
    this.game.load.spritesheet('coin', 'assets/images/coin.png', 300, 300, 5)
    this.game.load.spritesheet('blood_particle', 'assets/images/blood_particle.png')

    let audioExtension = this.game.device.safari ? 'wav' : 'ogg'

    this.game.load.audio('pickup_coin_sound', `assets/audio/pickup_coin.${audioExtension}`)
    this.game.load.audio('explosion_sound', `assets/audio/explosion.${audioExtension}`)
    this.game.load.audio('hit_sound', `assets/audio/hit.${audioExtension}`)
    this.game.load.audio('magic_wand_sound', `assets/audio/magic_wand.${audioExtension}`)
    this.game.load.audio('gameover_sound', `assets/audio/gameover.${audioExtension}`)
    this.game.load.audio('gamewin_sound', `assets/audio/gamewin.${audioExtension}`)
    this.game.load.audio('background_sound', `assets/audio/background.${audioExtension}`)
    this.game.load.audio('background_high_sound', `assets/audio/background_high.${audioExtension}`)
  }

  create () {
    this.state.start('Menu')
  }
}
