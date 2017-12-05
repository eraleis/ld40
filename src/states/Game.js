/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'
import Weed from '../sprites/Weed'
import Home from '../sprites/Home'
import Score from '../sprites/Score'
import { generateMap, generateEnemies, generateItems, loadHighTextures } from '../services/MapService'
import { startPhysics } from '../services/GameService'
import { initializePlayerInput } from '../services/InputService'
import { WIDTH as MAP_WIDTH } from '../data/Map'

export default class extends Phaser.State {
  init () {}
  preload () {
    this.game.background_music = this.game.add.audio('background_sound', 0.08, true)
    this.game.background_music_high = this.game.add.audio('background_high_sound', 0.08, true)
  }

  create () {
    this.game.background_music.play()

    // Start the physics system
    startPhysics(this.game)

    // Define logic game properties
    this.game.props = { highStarted: false, score: new Score(this.game) }

    // Define entities
    this.game.entities = {
      // groups
      world: generateMap(this.game), // Generate map basic elements
      enemies: this.game.add.group(),
      items: generateItems(this.game), // Generate map dynamic elements
      // single entity
      home: new Home(this.game),
      weed: new Weed(this.game),
      player: new Player(this.game)
    }

    // Lock camera on player
    this.game.camera.follow(this.game.entities.player)

    // Keyboard inputs
    initializePlayerInput(this.game)
  }

  animateBackgroup () {
    let old = this.game.camera.old_x
    this.game.camera.old_x = this.game.camera.x
    if (this.game.camera.x !== 0 &&
        old !== this.game.camera.x &&
        this.game.entities.player.body.velocity.x !== 0 &&
        this.game.camera.x !== MAP_WIDTH * 32 - this.game.width) {
      this.game.background_sky.tilePosition.x += (this.game.entities.player.body.velocity.x > 0) ? -2 : 2
      this.game.background.tilePosition.x += (this.game.entities.player.body.velocity.x > 0) ? -2 : 2
    }
  }

  update () {
    var self = this
    this.animateBackgroup()
    let arcade = this.game.physics.arcade
    arcade.collide(this.game.entities.player, this.game.entities.world)

    // Overlap with items
    this.game.entities.items.children.forEach((item) => {
      arcade.overlap(this.game.entities.player, item, _ => item.onOverlap(_ => {
        let score = this.game.entities.player.pickUpCoin()
        this.game.props.score.setScore(score)
      }))
    })

    // Overlap with enemies
    this.game.entities.enemies.children.forEach((enemy) => {
      if (enemy.key === 'cop') {
        arcade.overlap(enemy, this.game.entities.world, _ => enemy.reverse())
      }
      arcade.overlap(this.game.entities.player, enemy, _ => enemy.onOverlap(_ => {
        this.game.props.score.setScore(this.game.entities.player.hit(enemy.props.power))

        if (this.game.entities.player.state.score === 0) {
          this.game.entities.player.explode()
          setTimeout(function () {
            self.gameOver()
          }, 1000)
        }
      }))
    })

    arcade.overlap(
      this.game.entities.player,
      this.game.entities.weed,
      _ => { this.game.entities.player.smokeWeed(this.game.entities.weed) }
    )

    if (this.game.entities.player.state.high === true) {
      if (!this.game.props.highStarted) {
        loadHighTextures(this.game)
        this.game.background_music.stop()
        this.game.background_music_high.play()
        this.game.props.highStarted = true
      }
      if (this.game.entities.enemies.children.length === 0) {
        this.game.entities.enemies = generateEnemies(this.game)
      }
      arcade.overlap(
        this.game.entities.player,
        this.game.entities.home,
        _ => {
          if (this.game.entities.player.depositWeed(this.game.entities.home) === true) {
            this.state.start('Success', true, false, this.game.entities.player.state.score)
          }
        }
      )
    }

    if (this.game.entities.player.y > this.game.height) { this.gameOver() }
  }

  render () {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.game.entities.player, 32, 32)
      // this.game.debug.body(this.game.entities.player);
      // this.game.entities.enemies.children.forEach((enemy) => {
      //   this.game.debug.body(enemy);
      // })
      // this.game.entities.world.children.forEach((enemy) => {
      //   this.game.debug.body(enemy);
      // })
      // this.game.debug.cameraInfo(this.game.camera, 120, 120)
    }
  }

  gameOver () {
    this.state.start('GameOver')
  }

  shutdown () {
    this.game.background_music_high.stop()
    this.game.background_music.stop()
  }
}
