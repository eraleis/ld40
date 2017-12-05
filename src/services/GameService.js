const startPhysics = (game) => {
  game.physics.startSystem(Phaser.Physics.ARCADE)
  game.world.enableBody = true
}

export { startPhysics }
