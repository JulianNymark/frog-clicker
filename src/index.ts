import { Engine, Loader, DisplayMode } from 'excalibur';
import { LevelOne } from './scenes/level-one/level-one';
import { ClickFrog } from './actors/player/ClickFrog';
import { Resources } from './resources';
import { PointerScope } from 'excalibur/dist/Input/Pointer';
import './main.css';

/**
 * Managed game class
 */
class Game extends Engine {
  private frog: ClickFrog;
  private levelOne: LevelOne;

  constructor() {
    super({ 
      displayMode: DisplayMode.FullScreen,
      canvasElementId: "excalibur-canvas",
      // pointerScope: PointerScope.Canvas,
    });
  }

  public start() {

    this.levelOne = new LevelOne(this);

    // actors
    this.frog = new ClickFrog(game);

    this.levelOne.add(this.frog);

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
