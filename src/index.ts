import { Engine, Loader, DisplayMode } from 'excalibur';
import { MainScene } from './scenes/level-one/mainScene';
import { ClickFrog } from './actors/player/ClickFrog';
import { Resources } from './resources';
import { PointerScope } from 'excalibur/dist/Input/Pointer';
import './main.css';

/**
 * Managed game class
 */
class Game extends Engine {
  private frog: ClickFrog;
  private mainScene: MainScene;

  constructor() {
    super({ 
      displayMode: DisplayMode.FullScreen,
      canvasElementId: "excalibur-canvas",
      // pointerScope: PointerScope.Canvas, // BREAKS EVERYTHING!?
    });
  }

  public start() {

    this.mainScene = new MainScene(this);
    game.add('mainScene', this.mainScene);

    // Automatically load all default resources
    const loader = new Loader(Object.values(Resources));

    return super.start(loader);
  }
}

const game = new Game();
game.start().then(() => {
  game.goToScene('mainScene');
});
