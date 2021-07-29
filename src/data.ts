import { Construct, initConstructs } from "./constructs";
import { toastMessage } from "./toast";

type Data = {
  counter: number;
  spent: number;
  constructs: Construct[];
};

export let data: Data = {
  counter: 0,
  spent: 0,
  constructs: initConstructs(),
};

export const updateCounters = () => {
  const frogCounter = document.getElementById("frogCounter");
  frogCounter.innerHTML = `${(data.counter).toFixed(2)} frogs`;

  const netWorthCounter = document.getElementById("netWorth");
  netWorthCounter.innerHTML = `${(data.spent + data.counter).toFixed(2)} frogs`;

  const fpsCounter = document.getElementById("fps");
  fpsCounter.innerHTML = `${(calculateFPS(1000)).toFixed(2)} frogs/s`;
};

export const updateTitle = () => {
  document.title = `${Math.floor(data.counter)} frogs - Frog Clicker`;
}

export const saveData = () => {
  localStorage.setItem("data", JSON.stringify(data));
  toastMessage('your frogs have been saved');
  console.log("your frogs have been saved");
};

export const loadData = () => {
  data = JSON.parse(localStorage.getItem("data")) as Data;

  if (data == null) {
    data = {
      counter: 0,
      spent: 0,
      constructs: initConstructs(),
    }
  }
};

// FPS == frogs per second
export const calculateFPS = (tickTimeMs: number) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  return (data.constructs.map((c) => {
    return (c.current * c.frogPerSec) / (1000 / tickTimeMs);
  }).reduce(reducer));
}
