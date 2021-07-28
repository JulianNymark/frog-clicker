import { Engine, Scene } from 'excalibur';

const ui = document.getElementById('ui');

let game: Engine;

/**
 * Managed scene
 */
export class LevelOne extends Scene {
  public onInitialize(engine: Engine) {
    game = engine;
  }
  public onActivate() {
    ui.classList.add('MainGame');

    const btnStart = document.createElement('button');
    btnStart.id = 'frog-counter-button';
    btnStart.innerHTML = 'click';
    btnStart.className = 'button button--start';

    btnStart.onclick = (e) => {
      e.preventDefault();

      alert('incredible!');
      // game.goToScene('level-one');
    }

    ui.appendChild(btnStart);
  }
  public onDeactivate() {}
}
