import { data, saveData, saveNetWorthTime, updateCounters } from "./data";
import { numberFormat } from "./numberFormat";

export type Construct = {
  id: string;
  price: number;
  priceScale: number;
  current: number;
  frogPerSec: number;
  name: string;
  description?: string;
  tease: boolean;
  revealed: boolean;
};

export const constructs: Construct[] = [
  {
    id: "tadpole",
    price: 10,
    priceScale: 1.3,
    current: 0,
    frogPerSec: 0.1,
    name: "Tadpole",
    description: "A good boi",
    tease: true,
    revealed: true,
  },
  {
    id: "paint",
    price: 100,
    priceScale: 1.3,
    current: 0,
    frogPerSec: 1,
    name: "Green Paint",
    description: "Paint other small critters to obtain a frog instantly",
    tease: true,
    revealed: false,
  },
  {
    id: "toad",
    price: 1000,
    priceScale: 1.3,
    current: 0,
    frogPerSec: 5,
    name: "Toad",
    description: "This boi is pretty big",
    tease: true,
    revealed: false,
  },
  {
    id: "lilypad",
    price: 3333,
    priceScale: 1.1,
    current: 0,
    frogPerSec: 6,
    name: "Lily Pad",
    description: "A proper forever home. A place to sit",
    tease: true,
    revealed: false,
  },
  {
    id: "pond",
    price: 10000,
    priceScale: 1.3,
    current: 0,
    frogPerSec: 10,
    name: "Pond",
    description: "A whole pond of them!",
    tease: true,
    revealed: false,
  },
  {
    id: "lizard",
    price: 100000,
    priceScale: 1.3,
    current: 0,
    frogPerSec: 50,
    name: "Lizard",
    description: "This frog is incredibly long and speedy!",
    tease: true,
    revealed: false,
  },
  {
    id: "ocean",
    price: 1000000,
    priceScale: 1.3,
    current: 0,
    frogPerSec: 500,
    name: "Ocean",
    description: "Replace an ocean's fish with saltwater frogs",
    tease: true,
    revealed: false,
  },
  {
    id: "poisonfrog",
    price: 10000000,
    priceScale: 1.3,
    current: 0,
    frogPerSec: 5000,
    name: "Poisonous Frog",
    description: "Each color has a distinct fruity flavor",
    tease: true,
    revealed: false,
  },
];

export const initConstructs = () => {
  return constructs;
};

export const constructPrice = (construct: Construct) => {
  return construct.price * (Math.pow(construct.priceScale, construct.current));
};

export const revealCheck = () => {
  console.log("running revealCheck");
  for (const construct of data.constructs) {
    let value_reveal = (data.spent + data.counter)
    let value_tease = value_reveal * 1.5;
    
    if (value_tease >= constructPrice(construct)) {
      const constructElem = document.getElementById(construct.id);
      construct.revealed = true;
      constructElem?.classList.remove("hidden");
    }
    if (value_reveal >= constructPrice(construct)) {
      const constructElemName = document.querySelector(`#${construct.id} .name`);
      construct.tease = false;
      constructElemName!.innerHTML = construct.name;
      const constructElemArt = document.querySelector(`#${construct.id} .purchase-art`);
      constructElemArt?.classList.add('revealed');
    } 
  }
};

export const purchaseConstruct = (construct: Construct) => {
  const price = document.getElementById(`${construct.id}-price`);
  const current = document.getElementById(`${construct.id}-current`);

  const purchasePrice = constructPrice(construct);

  if (data.counter >= purchasePrice) {
    construct.current += 1;
    data.counter -= purchasePrice;
    data.spent += purchasePrice;

    current!.innerHTML = `CURRENT: ${construct.current}`;
    price!.innerHTML = `PRICE: ${numberFormat(constructPrice(construct))}`;

    updateCounters();
  }

  saveNetWorthTime();
};
