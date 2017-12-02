import map from '../data/Map'

export default (game) => {
  let group = game.add.group()

  game.world.setBounds(0, 0, map[0].length * 32, 600);

  var pos = {x: 0, y: game.world.height}

  for (var i = map.length - 1; i >= 0; i--) {
    pos.x = 0
    for (var j = 0; j < map[i].length; j++) {
      if (map[i][j] === 1) {
        let block = game.add.sprite(pos.x, pos.y, 'block')
        group.add(block)
        block.anchor.y = 1
        block.body.immovable = true
      }
      pos.x += 32
    }
    pos.y -= 32
  }
  return group
}
