import { Actor, Color, Engine, vec, Vector, Input } from 'excalibur';
import { data, updateCounters } from '../../data';
import { Resources } from '../../resources';

const FROG_SIZE = 300;

export class ClickFrog extends Actor {
  private startedClick = false;
  public enableCapturePointer: boolean;

  constructor(game: Engine) {
    super({
      pos: vec(250, game.drawHeight/2),
      width: FROG_SIZE,
      height: FROG_SIZE,
      color: new Color(255, 255, 255)
    });
    this.enableCapturePointer = true;
  }

  clickStart = (evt: Input.PointerEvent) => {
    this.startedClick = true;

    let firstSprite = this.graphics.current[0];
    firstSprite.graphic.scale.setTo((FROG_SIZE/Resources.Frog.width)*0.95, FROG_SIZE/Resources.Frog.height *0.95);
  };

  clickComplete = () => {
    if (!this.startedClick) return;
    this.startedClick = false;

    let firstSprite = this.graphics.current[0];
    firstSprite.graphic.scale.setTo(FROG_SIZE/Resources.Frog.width, FROG_SIZE/Resources.Frog.height);

    const frogsGained = 1; // TODO
    data.counter += frogsGained;
    updateCounters();
  };

  onInitialize() {
    const frogSprite = Resources.Frog.toSprite();
    frogSprite.scale = new Vector(FROG_SIZE/frogSprite.width, FROG_SIZE/frogSprite.height);
    this.graphics.use(frogSprite);
    this.on("pointerdown", this.clickStart);
    this.on("pointerup", this.clickComplete);
    this.on("pointerleave", this.clickComplete);
  }
}
