import humanFormat from "human-format";

var frogScale = new humanFormat.Scale({
  '': 1,
  thousand: 1000,
  million: 1000000,
  billion: 1000000000,
  trillion: 1000000000000,
  quadrillion: 1000000000000000,
  quintillion: 1000000000000000000,
  sextillion: 1000000000000000000000,
  septillion: 1000000000000000000000000,
});

export const numberFormat = (n: number, showDecimals = false): string => {
  return humanFormat(n, {scale: frogScale, decimals: showDecimals ? 3 : 0});
};
