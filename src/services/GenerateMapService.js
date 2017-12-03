import { map, WIDTH, HEIGHT, BLOCK_SIZE } from '../data/Map'
import Cop from '../sprites/Cop'
import Bomb from '../sprites/Bomb'
import Coin from '../sprites/Coin'

const generateMap = (game) => {
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

const loadHighTextures = (group) => {
  group.children.forEach( (block) => {
    block.loadTexture(`${block.key}_high`)
  })
}

const ENTITIES = {
  5: (g, p) => { return new Coin({ game: g, x: p.x, y: p.y, asset: 'coin' }) },
  6: (g, p) => { return new Cop({ game: g, x: p.x, y: p.y, asset: 'cop' }) },
  7: (g, p) => { return new Bomb({ game: g, x: p.x, y: p.y, asset: 'bomb' }) }
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
