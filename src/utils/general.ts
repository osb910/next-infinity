import moment from 'moment';

const dump = (obj: object) => JSON.stringify(obj, null, 2);

const logDump = (obj: object) => console.log(dump(obj));

// Generate a random number between two numbers (both inclusive)
export const randNum = (
  to: number,
  from: number = 1,
  {rounded}: {rounded?: boolean} = {rounded: true}
) => {
  const partialVal = Math.random() * (to - from + 1);
  if (rounded) {
    return Math.floor(partialVal) + from;
  } else {
    return partialVal + from;
  }
};

// Return a random item from an array, with optional starting index,    till ending index (non-inclusive)
export const randArrayEl = (
  arr: Array<any>,
  {from = 0, till = arr.length}: {from?: number; till?: number} = {}
) => {
  const idx = randNum(till, from);
  return arr[idx];
};

export const getRelativeDate = (date: string) => {
  return moment(date).fromNow();
};

export {dump, logDump};
