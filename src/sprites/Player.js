import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor (game) {
    super(game, 55, 0, 'player')
    game.add.existing(this)

    this.anchor.setTo(0.5)
    this.body.setSize(22, this.height, 22, 0)
    this.scale.set(-1, 1)

    this.body.gravity.y = 2000
    this.body.mass = 2

    this.props = { max_jump: 2 }
    this.state = { current_jump: 0, high: false, score: 0, invulnerable: Math.floor(Date.now() / 1000) }

    this.coin_particles = game.add.emitter(0, 0, 100)
    this.coin_particles.makeParticles('coin')
    this.coin_particles.gravity = 200
    this.coin_particles.minParticleScale = 0.2
    this.coin_particles.maxParticleScale = 0.2

    this.coin_sound = game.add.audio('pickup_coin_sound')
    this.smoke_weed_sound = game.add.audio('magic_wand_sound')
    this.death_sound = game.add.audio('')

    this.animations.add('walk', [0, 1, 2, 1, 0, 3, 4, 3], 15, true)
  }

  resetJumpObserver () {
    var resetJumpEventLoop = this.game.time.events.loop(20, _ => {
      if (this.body.velocity.y === 0) {
        this.state.current_jump = 0
        this.game.time.events.remove(resetJumpEventLoop)
      }
    }, this)
  }

  static jump () {
    if (this.state.current_jump >= this.props.max_jump) { return }
    if (this.state.current_jump === 0) { this.resetJumpObserver() }

    this.body.velocity.y = -500
    this.state.current_jump++
  }

  pickUpCoin () {
    this.state.score++
    this.coin_sound.play()
    return this.state.score
  }

  hit (nb) {
    var self = this

    if (Math.floor(Date.now() / 1000) - this.state.invulnerable > 2) {
      this.state.invulnerable = Math.floor(Date.now() / 1000)
      this.state.score -= nb
      let nbParticles = nb
      if (this.state.score < 0) {
        nbParticles = Math.abs(this.state.score)
        this.state.score = 0
      }

      let i = 0
      let tints = [0xff0000, 0xffffff]
      this.flash_event = this.game.time.events.loop(100, _ => {
        if (i > 1) {
          i = 0
        }
        this.tint = tints[i++]
      }, this)

      this.coin_particles.x = this.x
      this.coin_particles.y = this.y
      this.coin_particles.start(true, 2000, null, nbParticles)

      setTimeout(function () {
        this.game.time.events.remove(self.flash_event)
        self.tint = 0xffffff
      }, 2000)
    }
    return this.state.score
  }

  explode () {
    let explosion = this.game.add.emitter(0, 0, 100)
    explosion.makeParticles('blood_particle')
    explosion.gravity = 200
    explosion.x = this.x
    explosion.y = this.y

    this.death_sound.play()
    this.kill()
    explosion.start(true, 2000, null, 50)
  }

  moveLeft () {
    if (this.x > 10) {
      this.body.velocity.x = -200
    } else {
      this.body.velocity.x = 0
    }
    this.scale.set(1, 1)
    this.animations.play('walk')
  }

  moveRight () {
    if (this.x < this.game.world.width - 10) {
      this.body.velocity.x = 200
    } else {
      this.body.velocity.x = 0
    }
    this.scale.set(-1, 1)
    this.animations.play('walk')
  }

  moveStop () {
    this.body.velocity.x = 0
    this.animations.stop('walk')
  }

  smokeWeed (weed) {
    this.state.high = true
    this.smoke_weed_sound.play()
    weed.kill()
  }

  depositWeed (home) {
    if (this.state.high === true) {
      this.state.high = false
      return true
    } else { return false }
  }
}
