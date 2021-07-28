import { Engine, Scene, Timer } from "excalibur";
import { ClickFrog } from "../../actors/player/ClickFrog";
import { Construct, initConstructs } from "../../constructs";
import { data, loadData, saveData, updateCounters } from "../../data";

const TICK_TIME_MS = 100;

const ui = document.getElementById("ui");

let frog: ClickFrog;
let game: Engine;
let constructs: Construct[] = initConstructs();

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
  name.className = 'name';
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

  const clickHandler = () => {
    const purchasePrice = constructPrice(construct);
    if (data.counter >= purchasePrice) {
      construct.current += 1;
      data.counter -= purchasePrice;
      data.spent += purchasePrice;

      current.innerHTML = `CURRENT: ${construct.current}`;
      price.innerHTML = `PRICE: ${constructPrice(construct)}`;

      updateCounters();
    }
  };

  purchaseable.addEventListener('click', clickHandler);
  purchaseable.addEventListener('touchstart', clickHandler);

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

  const container = document.createElement('div');
  container.className = 'flex-row counter-container';

  const netWorthLabel = document.createElement('span');
  netWorthLabel.innerHTML = 'Net Worth:';
  container.appendChild(netWorthLabel);
  const netWorth = document.createElement("h4");
  netWorth.id = "netWorth";
  container.appendChild(netWorth);

  frogSection.appendChild(container);

  updateCounters();
};

// React alternative! ;D
const generateDom = () => {
  ui.appendChild(createSection("frog"));
  ui.appendChild(createSection("visuals"));
  ui.appendChild(createSection("purchases"));

  frogCounter();
  purchasesFromConstructs();
};

// FPS == frogs per second
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
  saveTimer: Timer;

  public onInitialize(engine: Engine) {
    game = engine;

    this.tickTimer = new Timer({
      interval: TICK_TIME_MS,
      repeats: true,
      fcn: () => {
        data.counter += calculateFPS();
        updateCounters();
      },
    });

    this.saveTimer = new Timer({
      interval: 1000 * 60,
      repeats: true,
      fcn: () => {
        saveData();
      },
    });
  }
  public onActivate() {
    ui.classList.add("MainGame");
    
    // actors
    frog = new ClickFrog(game);
    this.add(frog);

    loadData();

    generateDom();

    this.add(this.tickTimer);
    this.add(this.saveTimer);
  }
  public onDeactivate() {
    this.tickTimer.cancel();
  }
}
