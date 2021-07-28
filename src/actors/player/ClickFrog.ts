import { Actor, Color, Engine, Sprite, vec, Vector } from 'excalibur';
import { Resources } from '../../resources';
import { FrogCounter } from './FrogCounter';

const FROG_SIZE = 300;

export class ClickFrog extends Actor {
  private frogCounter: FrogCounter;
  private startedClick = false;

  constructor(game: Engine, frogCounter: FrogCounter) {
    super({
      pos: vec(250, game.drawHeight/2),
      width: FROG_SIZE,
      height: FROG_SIZE,
      color: new Color(255, 255, 255)
    });

    this.frogCounter = frogCounter;
  }

  clickStart = () => {
    this.startedClick = true;
    this.currentDrawing.scale.setTo((FROG_SIZE/this.currentDrawing.width)*0.95, FROG_SIZE/this.currentDrawing.height *0.95);
  };

  clickComplete = () => {
    if (!this.startedClick) return;
    this.startedClick = false;
    this.currentDrawing.scale.setTo(FROG_SIZE/this.currentDrawing.width, FROG_SIZE/this.currentDrawing.height);

    const initialCount = this.frogCounter.getFrogCount();
    const frogsGained = 1; // TODO
    this.frogCounter.setFrogCount(initialCount + frogsGained);
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
