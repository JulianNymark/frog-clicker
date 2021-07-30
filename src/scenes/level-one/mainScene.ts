import { Engine, Scene, Timer } from "excalibur";
import { ClickFrog } from "../../actors/player/ClickFrog";
import {
  Construct,
  constructPrice,
  initConstructs,
  patchConstructs,
  purchaseConstruct,
  revealCheck,
} from "../../constructs";
import {
  calculateFPS,
  data,
  generateOfflineFrogs,
  loadData,
  saveData,
  updateCounters,
  updateTitle,
} from "../../data";
import { registerTapHandlers } from "../../tapHandler";
import { hidden, initVisibilityChange } from "../../visibilityChange";

export const TICK_TIME_MS = 100;
export const BG_TICK_TIME_MS = 5000;

const ui = document.getElementById("ui");

let frog: ClickFrog;
let game: Engine;

const createSection = (id) => {
  const div = document.createElement("div");
  div.className = `main-section`;
  div.id = id;
  return div;
};

const createPurchaseableDiv = (construct: Construct) => {
  const purchaseable = document.createElement("div");
  purchaseable.className = `purchaseable ${construct.revealed ? "" : "hidden"}`;
  purchaseable.id = construct.id;

  const name = document.createElement("p");
  name.innerHTML = construct.name;
  name.className = "name";
  purchaseable.appendChild(name);
  const price = document.createElement("p");
  price.id = `${construct.id}-price`;
  price.innerHTML = `PRICE: ${constructPrice(construct)}`;
  purchaseable.appendChild(price);
  const description = document.createElement("p");
  description.innerHTML = `${construct.description}`;
  purchaseable.appendChild(description);
  const current = document.createElement("p");
  current.id = `${construct.id}-current`;
  current.innerHTML = `CURRENT: ${construct.current}`;
  purchaseable.appendChild(current);

  const clickHandler = () => {
    purchaseConstruct(construct);
  };

  purchaseable.addEventListener("click", clickHandler);
  registerTapHandlers(purchaseable, clickHandler);

  return purchaseable;
};

const purchasesFromConstructs = () => {
  const purchases = document.getElementById("purchases");

  for (const construct of data.constructs) {
    purchases.appendChild(createPurchaseableDiv(construct));
  }
};

const containerDiv = () => {
  const container = document.createElement("div");
  container.className = "flex-row counter-container";

  return container;
};

const frogCounter = () => {
  const frogSection = document.getElementById("frog");

  const counter = document.createElement("h1");
  counter.id = "frogCounter";
  frogSection.appendChild(counter);

  const netWorthContainer = containerDiv();
  const netWorthLabel = document.createElement("span");
  netWorthLabel.innerHTML = "Net Worth:";
  netWorthContainer.appendChild(netWorthLabel);
  const netWorth = document.createElement("h4");
  netWorth.id = "netWorth";
  netWorthContainer.appendChild(netWorth);
  frogSection.appendChild(netWorthContainer);

  const fpsContainer = containerDiv();
  const FPSLabel = document.createElement("span");
  FPSLabel.innerHTML = "FPS:";
  fpsContainer.appendChild(FPSLabel);
  const FPS = document.createElement("h4");
  FPS.id = "fps";
  fpsContainer.appendChild(FPS);
  frogSection.appendChild(fpsContainer);

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

/**
 * Managed scene
 */
export class MainScene extends Scene {
  tickTimer: Timer;
  revealCheckTimer: Timer;
  titleTimer: Timer;
  saveTimer: Timer;

  public onInitialize(engine: Engine) {
    game = engine;

    this.tickTimer = new Timer({
      interval: TICK_TIME_MS,
      repeats: true,
      fcn: () => {
        data.counter += calculateFPS(TICK_TIME_MS);
        updateCounters();
      },
    });

    this.revealCheckTimer = new Timer({
      interval: 1000 * 10,
      repeats: true,
      fcn: revealCheck,
    });

    this.titleTimer = new Timer({
      interval: 1000 * 5,
      repeats: true,
      fcn: updateTitle,
    });

    this.saveTimer = new Timer({
      interval: 1000 * 30,
      repeats: true,
      fcn: saveData,
    });
  }
  public onActivate() {
    ui.classList.add("MainGame");

    // actors
    frog = new ClickFrog(game);
    this.add(frog);

    loadData();
    patchConstructs();

    generateDom();

    this.add(this.tickTimer);
    this.add(this.revealCheckTimer);
    this.add(this.titleTimer);
    this.add(this.saveTimer);

    initVisibilityChange();

    const bgTimer = setInterval(() => {
      if (document[hidden]) {
        data.counter += calculateFPS(BG_TICK_TIME_MS);
        updateTitle();
        saveData();
      }
    }, BG_TICK_TIME_MS);
    
    generateOfflineFrogs();
  }
  public onDeactivate() {
    this.tickTimer.cancel();
  }
}
