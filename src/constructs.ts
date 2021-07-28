export type Construct = {
  id: string;
  price: number;
  priceScale: number;
  current: number;
  frogPerSec: number;
  name: string;
  description?: string;
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
  {
    id: "toad",
    price: 1000,
    priceScale: 1.3,
    current: 0,
    frogPerSec: 5,
    name: "Toad",
    description: "This boi is pretty big",
  },
  {
    id: "pond",
    price: 10000,
    priceScale: 1.3,
    current: 0,
    frogPerSec: 10,
    name: "Pond",
    description: "A whole pond of them!",
  },
  {
    id: "lizard",
    price: 100000,
    priceScale: 1.3,
    current: 0,
    frogPerSec: 50,
    name: "Lizard",
    description: "This frog is incredibly long and speedy!",
  },
  {
    id: "ocean",
    price: 1000000,
    priceScale: 1.3,
    current: 0,
    frogPerSec: 100,
    name: "Ocean",
    description: "Replace an ocean's fish with saltwater frogs",
  },
];

export const initConstructs = () => {
  return constructs;
}