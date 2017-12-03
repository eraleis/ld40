/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'
import Weed from '../sprites/Weed'
import Home from '../sprites/Home'
import Score from '../sprites/Score'
import { generateMap, generateEnemies, generateItems, loadHighTextures } from '../services/GenerateMapService'
import { WIDTH as MAP_WIDTH, BLOCK_SIZE } from '../data/Map'

export default class extends Phaser.State {
  init () {}
  preload () {}

  setHighBackground () {
    this.game.background_sky.loadTexture('background_sky_high', 0)
    this.game.background.loadTexture('background_high', 0)
    game.camera.flash(0x00ff00, 1000);
    game.time.events.loop(100, _ => {
      this.game.background_sky.tint = Math.random() * 0xffffff;
    }, this);
  }

  create () {
    let game = this.game

    this.game.background_sky = this.game.add.tileSprite(0, 0, 800, 600, 'background_sky')
    this.game.background = this.game.add.tileSprite(0, 0, 800, 600, 'background')
    this.game.background_sky.fixedToCamera = true
    this.game.background.fixedToCamera = true

    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.world.enableBody = true
    this.worldGroup = generateMap(game)

    this.highStarted = false

    this.enemies = game.add.group()
    this.items = generateItems(game)

    this.score = new Score({
      game: this.game,
      x: 50,
      y: 50,
      text: 'Score: 0'
    })

    this.home = new Home({
      game: this.game,
      x: 50,
      y: this.world.height - BLOCK_SIZE,
      asset: 'home'
    })

    this.player = new Player({ game: this.game, x: 55, y: 0, asset: 'player' })

    this.weed = new Weed({
      game: this.game,
      x: this.world.width - 20,
      y: this.world.height - BLOCK_SIZE,
      asset: 'weed'
    })

    game.camera.follow(this.player)

    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT ])
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(Player.jump, this.player)
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(Player.jump, this.player)
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
  }

  animateBackgroup () {
    if (this.game.camera.x !== 0 &&
        this.player.body.velocity.x !== 0 &&
        this.game.camera.x !== MAP_WIDTH * 32 - this.game.width) {
      this.game.background_sky.tilePosition.x += (this.player.body.velocity.x > 0) ? -2 : 2
      this.game.background.tilePosition.x += (this.player.body.velocity.x > 0) ? -2 : 2
    }
  }

  update () {
    this.animateBackgroup()
    let arcade = this.game.physics.arcade
    arcade.collide(this.player, this.worldGroup)

    // Overlap with items
    this.items.children.forEach((item) => {
      arcade.overlap(this.player, item, _ => item.onOverlap(_ => {
        let score = this.player.pickUpCoin()
        this.score.setScore(score)
      }))
    })

    // Overlap with enemies
    this.enemies.children.forEach((enemy) => {
      if (enemy.key === 'cop') {
        arcade.overlap(enemy, this.worldGroup, _ => enemy.reverse())
      }
      arcade.overlap(this.player, enemy, _ => enemy.onOverlap(_ => {
        this.score.setScore(this.player.hit(enemy.props.power))

        if (this.player.state.score === 0) {
          this.gameOver()
        }
      }))
    })

    arcade.overlap(
      this.player,
      this.weed,
      _ => { this.player.smokeWeed(this.weed) }
    )

    if (this.player.state.high === true) {
      if (!this.highStarted) {
        this.setHighBackground()
        loadHighTextures(this.worldGroup)
        this.highStarted = true
      }
      if (this.enemies.children.length === 0) {
        this.enemies = generateEnemies(this.game)
      }
      arcade.overlap(
        this.player,
        this.home,
        _ => {
          if (this.player.depositWeed(this.home) === true) {
            this.state.start('Success', true, false, this.player.state.score)
          }
        }
      )
    }

    if (this.rightKey.isDown) {
      this.player.moveRight()
    } else if (this.leftKey.isDown) {
      this.player.moveLeft()
    } else {
      this.player.stopMove()
    }

    if (this.player.y > this.game.height) { this.gameOver() }

    Player.resetJump(this.player)
  }

  render () {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.player, 32, 32)
      // this.game.debug.body(this.player);
      // this.enemies.children.forEach((enemy) => {
      //   this.game.debug.body(enemy);
      // })
      // this.game.debug.cameraInfo(this.game.camera, 120, 120)
    }
  }

  gameOver () {
    this.state.start('GameOver')
  }
}
