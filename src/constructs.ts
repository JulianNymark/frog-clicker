import { data, saveData, updateCounters } from "./data";

export type Construct = {
  id: string;
  price: number;
  priceScale: number;
  current: number;
  frogPerSec: number;
  name: string;
  description?: string;
  revealed: boolean;
};

const constructs: Construct[] = [
  {
    id: "tadpole",
    price: 10,
    priceScale: 1.3,
    current: 0,
    frogPerSec: 0.1,
    name: "Tadpole",
    description: "A good boi",
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
    revealed: false,
  },
  {
    id: "lilypad",
    price: 3333,
    priceScale: 1.1,
    current: 0,
    frogPerSec: 6,
    name: "Lily Pad",
    description: "A literal green floating stepping-stone for all frogs",
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
    revealed: false,
  },
  {
    id: "poisonfrog",
    price: 10000000,
    priceScale: 1.3,
    current: 0,
    frogPerSec: 5000,
    name: "Poisonous Frog",
    description: "Each color has a distinct flavor",
    revealed: false,
  },
];

export const initConstructs = () => {
  return constructs;
}

export const constructPrice = (construct: Construct) => {
  return construct.price * (Math.pow(construct.priceScale, construct.current));
}

export const revealCheck = () => {
  console.log('running revealCheck');
  for (const construct of data.constructs) {
    if ((data.spent + data.counter) >= constructPrice(construct)) {
      construct.revealed = true;
      const constructElem = document.getElementById(construct.id);
      constructElem.classList.remove('hidden');
    }
  }
}

export const patchConstructs = () => {
  for (const construct of data.constructs) {
    if (construct.id === 'ocean') {
      construct.frogPerSec = 500;
    }
  }
}