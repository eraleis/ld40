import { map, WIDTH, HEIGHT, BLOCK_SIZE } from '../data/Map'
import Cop from '../sprites/Cop'

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

const generateEnemies = (game) => {
  let arr = { 6: Cop }
  let group = game.add.group()

  var pos = { x: 0, y: game.world.height }

  for (var i = HEIGHT - 1; i >= 0; i--) {
    pos.x = 0
    for (var j = 0; j < WIDTH; j++) {
      if (map[i][j] >= 6) {
        let enemy = new Cop({
          game: game,
          x: pos.x,
          y: pos.y,
          asset: 'cop'
        })
        group.add(enemy)
      }
      pos.x += BLOCK_SIZE
    }
    pos.y -= BLOCK_SIZE
  }
  return group
}

export { generateMap, generateEnemies }
