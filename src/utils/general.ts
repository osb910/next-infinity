import moment from 'moment';

type ShareOptions = {
  caption?: string;
  source?: string;
};

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

export const getDeepProp = <T extends string = string>(
  obj: object,
  key: T,
  {delimiter = '.'} = {}
) => {
  const path = key.split(delimiter);
  return path.reduce((acc, prop) => (acc as any)?.[prop], obj);
};

export const getRelativeDate = (date: string) => {
  return moment(date).fromNow();
};

export const getFacebookShareLink = (
  url: string,
  {caption = ''}: ShareOptions
) => {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url
  )}& quote=${caption}`;
};

export const getTwitterShareLink = (
  url: string,
  {caption = '', source}: ShareOptions = {}
) =>
  `https://twitter.com/intent/tweet/?text=${encodeURIComponent(caption ?? '')}${
    source && `&related=@${source}`
  }&url=${encodeURIComponent(url)}`;

export const getLinkedInShareLink = (
  url: string,
  {caption = '', source}: ShareOptions
) => {
  return `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
    url
  )}&title=&summary=${
    source &&
    `&source=${source}
`
  }`;
};

export const getWhatsappShareLink = (
  url: string,
  {caption = '', source}: ShareOptions
) =>
  `https://api.whatsapp.com/send?&text=${encodeURIComponent(
    url
  )} \n${encodeURIComponent(caption)}`;
export const getTelegramShareLink = (
  url: string,
  {caption = '', source}: ShareOptions
) => `https://telegram.me/share/url?url=${encodeURIComponent(url)}`;

export {dump, logDump};
