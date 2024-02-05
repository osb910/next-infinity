const dump = (obj: object) => JSON.stringify(obj, null, 2);

const logDump = (obj: object) => console.log(dump(obj));

// Generate a random number between two numbers (both inclusive)
export const randNum = (to: number, from: number = 1) => {
  return Math.floor(Math.random() * (to - from + 1)) + from;

  /* Recursive
   const trials = [];
   const n = Math.floor(Math.random() * (to + 1));
   trials.includes(n) && rndNum(to, from);
   trials.push(n);
   return n >= from ? n : rndNum(to, from);
   */
};

// Return a random item from an array, with optional starting index,    till ending index (non-inclusive)
export const randArrayEl = (
  arr: Array<any>,
  {from = 0, till = arr.length}: {from?: number; till?: number} = {}
) => {
  const idx = randNum(till, from);
  return arr[idx];
};

export {dump, logDump};
