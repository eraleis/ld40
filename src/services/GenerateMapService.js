import { map, WIDTH, HEIGHT, BLOCK_SIZE } from '../data/Map'
import Cop from '../sprites/Cop'
import Bomb from '../sprites/Bomb'

const generateMap = (game) => {
  let group = game.add.group()

  game.world.setBounds(0, 0, WIDTH * BLOCK_SIZE, 600)

  var pos = { x: 0, y: game.world.height }

  for (var i = HEIGHT - 1; i >= 0; i--) {
    pos.x = 0
    for (var j = 0; j < WIDTH; j++) {
      if (map[i][j] > 0 && map[i][j] < 6) {
        let block = game.add.sprite(pos.x, pos.y, `block_${map[i][j]}`)
        group.add(block)
        block.anchor.y = 1
        block.body.immovable = true
      }
      pos.x += BLOCK_SIZE
    }
    pos.y -= BLOCK_SIZE
  }
  return group
}

const ENEMIES = {
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
        let enemy = ENEMIES[map[i][j]](game, pos)
        console.log('DEBUG :: ', enemy)
        group.add(enemy)
      }
      pos.x += BLOCK_SIZE
    }
    pos.y -= BLOCK_SIZE
  }
  return group
}

export { generateMap, generateEnemies }
