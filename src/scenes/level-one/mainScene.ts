import { Engine, Scene, Timer } from "excalibur";
import { ClickFrog } from "../../actors/player/ClickFrog";

const TICK_TIME_MS = 100;

type Construct = {
  id: string;
  price: number;
  priceScale: number;
  current: number;
  frogPerSec: number;
  name: string;
  description?: string;
};

const ui = document.getElementById("ui");

let frog: ClickFrog;
let game: Engine;
const constructs: Construct[] = [ // TODO: saveable & loadable
  {
    id: "tadpole",
    price: 10,
    priceScale: 1.3,
    current: 0,
    frogPerSec: 0.1,
    name: "Tadpoles",
    description: "A good boi",
  },
  {
    id: "paint",
    price: 100,
    priceScale: 1.3,
    current: 0,
    frogPerSec: 1,
    name: "Green Paint",
    description: "Paint other small critters to obtain a frog instantly",
  },
];

const createSection = (id) => {
  const div = document.createElement("div");
  div.className = `main-section`;
  div.id = id;
  return div;
};

const constructPrice = (construct: Construct) => {
  return construct.price * (Math.pow(construct.priceScale, construct.current));
}

const createPurchaseableDiv = (construct: Construct) => {
  const purchaseable = document.createElement("div");
  purchaseable.className = "purchaseable";
  purchaseable.id = construct.id;

  const name = document.createElement("p");
  name.innerHTML = construct.name;
  purchaseable.appendChild(name);
  const price = document.createElement("p");
  price.innerHTML = `PRICE: ${constructPrice(construct)}`;
  purchaseable.appendChild(price);
  const description = document.createElement("p");
  description.innerHTML = `${construct.description}`;
  purchaseable.appendChild(description);
  const current = document.createElement("p");
  current.innerHTML = `CURRENT: ${construct.current}`;
  purchaseable.appendChild(current);

  purchaseable.onclick = () => {
    const purchasePrice = constructPrice(construct);
    if (frog.counter >= purchasePrice) {
      construct.current += 1;
      frog.counter -= purchasePrice;

      current.innerHTML = `CURRENT: ${construct.current}`;
      price.innerHTML = `PRICE: ${constructPrice(construct)}`;
    }
  };

  return purchaseable;
};

const purchasesFromConstructs = () => {
  const purchases = document.getElementById("purchases");

  for (const construct of constructs) {
    purchases.appendChild(createPurchaseableDiv(construct));
  }
};

const frogCounter = () => {
  const frogSection = document.getElementById("frog");

  const counter = document.createElement("h1");
  counter.id = "frogCounter";
  frogSection.appendChild(counter);
  frog.updateCounter(); // TODO: refactor out of the frog actor?
};

// React alternative! ;D
const generateDom = () => {
  ui.appendChild(createSection("frog"));
  ui.appendChild(createSection("visuals"));
  ui.appendChild(createSection("purchases"));

  frogCounter();
  purchasesFromConstructs();
};

const calculateFPS = () => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  return (constructs.map((c) => {
    return (c.current * c.frogPerSec) / (1000 / TICK_TIME_MS);
  }).reduce(reducer));
}

/**
 * Managed scene
 */
export class MainScene extends Scene {
  tickTimer: Timer;

  public onInitialize(engine: Engine) {
    game = engine;

    this.tickTimer = new Timer({
      interval: TICK_TIME_MS,
      repeats: true,
      fcn: () => {
        frog.counter += calculateFPS();
        frog.updateCounter();
      },
    });
  }
  public onActivate() {
    ui.classList.add("MainGame");

    // actors
    frog = new ClickFrog(game);
    this.add(frog);

    generateDom();

    this.add(this.tickTimer);
  }
  public onDeactivate() {
    this.tickTimer.cancel();
  }
}
