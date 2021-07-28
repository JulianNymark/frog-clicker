import { Actor, Color, Engine, Sprite, vec, Vector } from 'excalibur';
import { Resources } from '../../resources';

const FROG_SIZE = 300;

export class ClickFrog extends Actor {
  private startedClick = false;
  counter = 0; // TODO: saveable & loadable

  constructor(game: Engine) {
    super({
      pos: vec(250, game.drawHeight/2),
      width: FROG_SIZE,
      height: FROG_SIZE,
      color: new Color(255, 255, 255)
    });
  }

  updateCounter = () => {
    const frogCounter = document.getElementById("frogCounter");
    frogCounter.innerHTML = `${(this.counter).toFixed(2)} frogs`;
  }

  clickStart = () => {
    this.startedClick = true;
    this.currentDrawing.scale.setTo((FROG_SIZE/this.currentDrawing.width)*0.95, FROG_SIZE/this.currentDrawing.height *0.95);
  };

  clickComplete = () => {
    if (!this.startedClick) return;
    this.startedClick = false;
    this.currentDrawing.scale.setTo(FROG_SIZE/this.currentDrawing.width, FROG_SIZE/this.currentDrawing.height);

    const frogsGained = 1; // TODO
    this.counter = this.counter + frogsGained;
    this.updateCounter();
  };

  onInitialize() {
    const frogSprite = Resources.Frog.asSprite();
    frogSprite.scale = new Vector(FROG_SIZE/frogSprite.width, FROG_SIZE/frogSprite.height);
    this.addDrawing(frogSprite);
    this.on("pointerdown", this.clickStart);
    this.on("pointerup", this.clickComplete);
    this.on("pointerleave", this.clickComplete);
  }
}
