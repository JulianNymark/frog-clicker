import { Engine, Loader, DisplayMode } from 'excalibur';
import { MainScene } from './scenes/level-one/mainScene';
import { Resources } from './resources';
import './main.css';

/**
 * Managed game class
 */
class Game extends Engine {
  private mainScene: MainScene;

  constructor() {
    super({ 
      displayMode: DisplayMode.FillScreen,
      canvasElementId: "excalibur-canvas",
      suppressPlayButton: true,
      // pointerScope: PointerScope.Canvas, // BREAKS EVERYTHING!?
    });
    this.mainScene = new MainScene();
  }

  public start() {
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
