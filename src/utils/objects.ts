import type {DotPathValue, DottedPaths} from '@/types';

export const getDeepProp = <
  T extends Record<string, unknown>,
  P extends DottedPaths<T>
>(
  obj: T,
  key: P,
  {delimiter = '.'} = {}
): DotPathValue<T, P> => {
  const path = key.split(delimiter);
  return path.reduce<unknown>(
    (acc, prop) => (acc as Record<string, unknown>)?.[prop],
    obj
  ) as DotPathValue<T, P>;
};

/**
 * Performs a deep comparison between two values to determine if they are equivalent.
 * @param value1 The first value to compare
 * @param value2 The second value to compare
 * @returns True if the values are equivalent, false otherwise
 */
export const isEqual = (value1: unknown, value2: unknown): boolean => {
  // Handle primitive types and null/undefined
  if (value1 === value2) return true;

  // If either value is null or undefined, they're not equal (since we checked === above)
  if (
    value1 === null ||
    value2 === null ||
    value1 === undefined ||
    value2 === undefined
  )
    return false;

  // Handle Dates
  if (value1 instanceof Date && value2 instanceof Date) {
    return value1.getTime() === value2.getTime();
  }

  // Handle RegExp
  if (value1 instanceof RegExp && value2 instanceof RegExp) {
    return value1.toString() === value2.toString();
  }

  // If either value is not an object, they're not equal (since we checked === above)
  if (typeof value1 !== 'object' || typeof value2 !== 'object') return false;

  // Handle Arrays
  if (Array.isArray(value1) && Array.isArray(value2)) {
    if (value1.length !== value2.length) {
      return false;
    }

    // Compare each element recursively
    return value1.every((val, index) => isEqual(val, value2[index]));
  }

  // If one is array and other isn't, they're not equal
  if (Array.isArray(value1) || Array.isArray(value2)) return false;

  // Handle Objects
  const keys1 = Object.keys(value1 as object);
  const keys2 = Object.keys(value2 as object);

  if (keys1.length !== keys2.length) return false;

  return keys1.every((key) => {
    const val1 = (value1 as {[key: string]: unknown})[key];
    const val2 = (value2 as {[key: string]: unknown})[key];

    // Check if the key exists in the second object
    if (!Object.prototype.hasOwnProperty.call(value2, key)) return false;

    // Recursively compare values
    return isEqual(val1, val2);
  });
};
