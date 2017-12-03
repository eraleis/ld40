import Phaser from 'phaser'
import StartButton from '../sprites/Start'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#f4bb3f'
  }

  preload () {}

  create () {
    this.startButton = new StartButton({
      game: this.game,
      x: this.game.width / 2,
      y: this.game.height / 2,
      asset: 'start'
    })

    this.startButton.events.onInputDown.add(StartButton.onClick, this)
  }

  static onClick () { this.state.start('Game', true, false) }
}
