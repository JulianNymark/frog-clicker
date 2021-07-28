import { Engine, Loader, DisplayMode } from 'excalibur';
import { LevelOne } from './scenes/level-one/level-one';
import { ClickFrog } from './actors/player/ClickFrog';
import { Resources } from './resources';
import { FrogCounter } from './actors/player/FrogCounter';
import './main.css';

/**
 * Managed game class
 */
class Game extends Engine {
  private frog: ClickFrog;
  private levelOne: LevelOne;
  private frogCounter: FrogCounter;

  constructor() {
    super({ 
      displayMode: DisplayMode.FullScreen,
      canvasElementId: "excalibur-canvas",
    });
  }

  public start() {

    this.levelOne = new LevelOne(this);

    // actors
    this.frogCounter = new FrogCounter(game);
    this.frog = new ClickFrog(game, this.frogCounter);

    this.levelOne.add(this.frog);
    this.levelOne.add(this.frogCounter);

    game.add('levelOne', this.levelOne);

    // Automatically load all default resources
    const loader = new Loader(Object.values(Resources));

    return super.start(loader);
  }
}

const game = new Game();
game.start().then(() => {
  game.goToScene('levelOne');
});
