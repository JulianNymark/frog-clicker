import { Construct, initConstructs } from "./constructs";
import { numberFormat } from "./numberFormat";
import { toastMessage } from "./toast";

type Data = {
  counter: number;
  spent: number;
  constructs: Construct[];
};

type NetworthTime = {
  netWorth: number;
  timeUTC: number;
};

export let data: Data = {
  counter: 0,
  spent: 0,
  constructs: initConstructs(),
};

export const updateCounters = () => {
  const frogCounter = document.getElementById("frogCounter");
  frogCounter.innerHTML = `${numberFormat(data.counter)} frogs`;

  const netWorthCounter = document.getElementById("netWorth");
  netWorthCounter.innerHTML = `${numberFormat(data.spent + data.counter)} frogs`;

  const fpsCounter = document.getElementById("fps");
  fpsCounter.innerHTML = `${numberFormat(calculateFPS(1000))} frogs/s`;
};

export const updateTitle = () => {
  document.title = `${numberFormat(Math.floor(data.counter))} frogs - Frog Clicker`;
};

export const saveData = () => {
  localStorage.setItem("data", JSON.stringify(data));
  toastMessage("your frogs have been saved");
  console.log("your frogs have been saved");
};

export const loadData = () => {
  data = JSON.parse(localStorage.getItem("data")) as Data;

  if (data == null) {
    data = {
      counter: 0,
      spent: 0,
      constructs: initConstructs(),
    };
  }
};

// FPS == frogs per second
export const calculateFPS = (tickTimeMs: number) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  return (data.constructs.map((c) => {
    return (c.current * c.frogPerSec) / (1000 / tickTimeMs);
  }).reduce(reducer));
};

export const generateOfflineFrogs = () => {
  const netWorthTime: NetworthTime = JSON.parse(
    localStorage.getItem("netWorthTime"),
  );

  if (netWorthTime) {
    const diffTimeMs = (new Date()).getTime() - netWorthTime.timeUTC;
    const diffTimeFrogs = calculateFPS(diffTimeMs);

    if (diffTimeFrogs > (data.spent + data.counter)) {
      data.counter += diffTimeFrogs;
    }
  }
  saveNetWorthTime();
};

export const saveNetWorthTime = () => {
  const netWorthTime: NetworthTime = {
    netWorth: data.spent + data.counter,
    timeUTC: (new Date()).getTime(),
  };

  localStorage.setItem("netWorthTime", JSON.stringify(netWorthTime));
};
