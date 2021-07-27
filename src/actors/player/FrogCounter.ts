import { Color, Engine, Label, Texture, vec } from "excalibur";

export class FrogCounter extends Label {
  private count: number;

  constructor(game: Engine) {
    super({
      pos: vec(150, game.drawHeight / 2 - 200),
      color: new Color(255, 255, 255),
      text: "",
      fontSize: 20,
    });
  }

  onInitialize() {
    this.count = 0;
    this.text = `${this.count} Frogs`;
  }

  setFrogCount(number: number) {
    this.count = number;
    this.text = `${this.count} Frogs`;
  }

  getFrogCount() {
    return this.count;
  }
}
