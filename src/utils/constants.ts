interface TIMEObject {
  [key: string]: number;
}

export const TIME: TIMEObject = Object.freeze({
  SEC: 1000,
  GOLDEN_SEC: 1618,
  PI_SEC: 3141,
  MINUTE: 60000,
  HOUR: 3600000,
  DAY: 86400000,
  WEEK: 604800000,
  MONTH: 2592000000,
  YEAR: 31536000000,
});
