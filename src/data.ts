import { Construct, initConstructs } from "./constructs";

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
};

export const saveData = () => {
  localStorage.setItem("data", JSON.stringify(data));
  console.log("game has been saved");
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
