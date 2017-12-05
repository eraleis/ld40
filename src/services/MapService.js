import Phaser from 'phaser'
import { map, WIDTH, HEIGHT, BLOCK_SIZE } from '../data/Map'
import Cop from '../sprites/Cop'
import Bomb from '../sprites/Bomb'
import Coin from '../sprites/Coin'

const ENTITIES = {
  5: (g, p) => { return new Coin({ game: g, x: p.x, y: p.y, asset: 'coin' }) },
  6: (g, p) => { return new Cop({ game: g, x: p.x, y: p.y, asset: 'cop' }) },
  7: (g, p) => { return new Bomb({ game: g, x: p.x, y: p.y, asset: 'bomb' }) }
}

const generateMap = (game) => {
  // Load background
  game.background_sky = game.add.tileSprite(0, 0, 800, 600, 'background_sky')
  game.background = game.add.tileSprite(0, 0, 800, 600, 'background')
  game.background_sky.fixedToCamera = true
  game.background.fixedToCamera = true

  // Load blocks
  let group = game.add.group()

  game.world.setBounds(0, 0, WIDTH * BLOCK_SIZE, 600)

  var pos = { x: 0, y: game.world.height }

  for (var i = HEIGHT - 1; i >= 0; i--) {
    pos.x = 0
    for (var j = 0; j < WIDTH; j++) {
      if (map[i][j] > 0 && map[i][j] < 5) {
        let block = game.add.sprite(pos.x, pos.y, `block_${map[i][j]}`)
        group.add(block)
        if (map[i][j] === 2) {
          block.body.setSize(block.body.width, 10, 0, 0)
        }
        block.anchor.y = 1
        block.body.immovable = true
      }
      pos.x += BLOCK_SIZE
    }
    pos.y -= BLOCK_SIZE
  }
  return group
}

const loadHighTextures = (game) => {
  // Load 'high' blocks
  game.entities.world.children.forEach((block) => {
    block.loadTexture(`${block.key}_high`)
  })

  // Load 'high' sky texture + make it flash
  game.background_sky.loadTexture('background_sky_high', 0)
  game.background.loadTexture('background_high', 0)
  game.camera.flash(0x00ff00, 1000)
  game.time.events.loop(100, _ => {
    game.background_sky.tint = Math.random() * 0xffffff
  }, this)

  // Load return home arrow at the end of the level
  var arrowLeft = game.add.sprite(game.world.width - 50, 50, 'arrow_left')
  arrowLeft.anchor.set(1, 0)
  arrowLeft.scale.setTo(0)
  game.time.events.loop(100, _ => {
    arrowLeft.tint = Math.random() * 0xffffff
  }, this)

  game.add.tween(arrowLeft.scale).to({x: 1, y: 1}, 500, Phaser.Easing.Back.Out, true, 1000)
}

const generateEnemies = (game) => {
  let group = game.add.group()

  var pos = { x: 0, y: game.world.height }

  for (var i = HEIGHT - 1; i >= 0; i--) {
    pos.x = 0
    for (var j = 0; j < WIDTH; j++) {
      if (map[i][j] >= 6) {
        let enemy = ENTITIES[map[i][j]](game, pos)
        group.add(enemy)
      }
      pos.x += BLOCK_SIZE
    }
    pos.y -= BLOCK_SIZE
  }
  return group
}

const generateItems = (game) => {
  let group = game.add.group()

  var pos = { x: 0, y: game.world.height }

  for (var i = HEIGHT - 1; i >= 0; i--) {
    pos.x = 0
    for (var j = 0; j < WIDTH; j++) {
      if (map[i][j] === 5) {
        let enemy = ENTITIES[map[i][j]](game, pos)
        group.add(enemy)
      }
      pos.x += BLOCK_SIZE
    }
    pos.y -= BLOCK_SIZE
  }
  return group
}

export { generateMap, generateEnemies, generateItems, loadHighTextures }
