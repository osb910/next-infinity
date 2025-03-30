'use client';

import {getDeepProp} from '@/utils/objects';
import {useState} from 'react';

export type Obj = {[x: string]: unknown};

export interface UniqueOptions {
  unique?: string | boolean;
}

export type FilterCallback<T> = (
  value: T,
  index: number,
  array: T[]
) => boolean;

// Return type for the hook
export interface UseArrayReturn<T> {
  array: T[];
  push: (added: T | T[], options: UniqueOptions) => void;
  unshift: (added: T | T[], options: UniqueOptions) => void;
  enqueue: (added: T, options: UniqueOptions) => void;
  pop: (qty?: number) => T[] | undefined;
  shift: (qty?: number) => T[] | undefined;
  dequeue: () => T | undefined;
  filter: (callback: FilterCallback<T>) => void;
  update: (index: number, newElement: T) => void;
  remove: (...indexes: number[]) => T[];
  clear: () => void;
}

const useArray = <T = unknown>(
  defaultValue: Array<T> | (() => Array<T>)
): UseArrayReturn<T> => {
  const [array, setArray] = useState<Array<T>>(defaultValue);

  const push = (
    added: T | Array<T>,
    {unique = false}: {unique?: string | boolean}
  ) => {
    if (!added || (added instanceof Array && added.length === 0)) return;
    if (added instanceof Array) {
      const toBeAdded = unique
        ? added.filter(
            (el: T) =>
              !array.some((a) => {
                const addedProp =
                  typeof unique === 'string'
                    ? getDeepProp(a as Obj, unique)
                    : a;
                const elProp =
                  typeof unique === 'string'
                    ? getDeepProp(el as Obj, unique)
                    : el;
                return addedProp === elProp;
              })
          )
        : added;
      setArray((arr) => [...arr, ...toBeAdded]);
    } else {
      const addedExists = array.some((el) => {
        const addedProp =
          typeof unique === 'string' ? getDeepProp(el as Obj, unique) : el;
        const elProp =
          typeof unique === 'string'
            ? getDeepProp(added as Obj, unique)
            : added;
        return addedProp === elProp;
      });
      if (unique && addedExists) return;
      setArray((arr) => [...arr, added]);
    }
  };

  const unshift = (
    added: T | Array<T>,
    {unique = false}: {unique?: string | boolean}
  ) => {
    if (!added || (added instanceof Array && added.length === 0)) return;
    if (added instanceof Array) {
      const toBeAdded = unique
        ? added.filter(
            (el: T) =>
              !array.some((a) => {
                const addedProp =
                  typeof unique === 'string'
                    ? getDeepProp(a as Obj, unique)
                    : a;
                const elProp =
                  typeof unique === 'string'
                    ? getDeepProp(el as Obj, unique)
                    : el;
                return addedProp === elProp;
              })
          )
        : added;
      setArray((arr) => [...toBeAdded, ...arr]);
    } else {
      const addedExists = array.some((el) => {
        const addedProp =
          typeof unique === 'string' ? getDeepProp(el as Obj, unique) : el;
        const elProp =
          typeof unique === 'string'
            ? getDeepProp(added as Obj, unique)
            : added;
        return addedProp === elProp;
      });
      if (unique && addedExists) return;
      setArray((arr) => [added, ...arr]);
    }
  };

  const enqueue = (added: T, {unique = false}: {unique?: string | boolean}) => {
    const addedExists = array.some((el) => {
      const addedProp =
        typeof unique === 'string' ? getDeepProp(el as Obj, unique) : el;
      const elProp =
        typeof unique === 'string' ? getDeepProp(added as Obj, unique) : added;
      return addedProp === elProp;
    });
    if (unique && addedExists) return;

    setArray((arr) => [...arr, added]);
  };

  const pop = (qty?: number) => {
    let removed;
    setArray((arr) => {
      if (qty && qty < 1) return arr;
      const kept = arr.slice(0, (qty ?? 1) * -1);
      removed = arr.slice(arr.length - (qty ?? 1));
      return kept;
    });
    return removed;
  };

  const shift = (qty?: number) => {
    let removed;
    setArray((arr) => {
      if (qty && qty < 1) return arr;
      const kept = arr.slice(qty ?? 1);
      removed = arr.slice(0, qty ?? 1);
      return kept;
    });
    return removed;
  };

  const dequeue = () => {
    let removed;
    setArray((arr) => {
      const [first, ...rest] = arr;
      removed = first;
      return rest;
    });
    return removed;
  };

  const filter = (cb: (v: T, idx: number, arr: Array<T>) => boolean) => {
    setArray((arr) => arr.filter(cb));
  };

  const update = (idx: number, newElement: T) => {
    setArray((arr) => [
      ...arr.slice(0, idx),
      newElement,
      ...arr.slice(idx + 1),
    ]);
  };

  const remove = (...indexes: Array<number>) => {
    const newArr: Array<T> = [];
    const removed: Array<T> = [];
    array.forEach((el, idx) => {
      if (indexes.includes(idx)) {
        removed.push(el);
      } else {
        newArr.push(el);
      }
    });
    setArray(newArr);
    return removed;
  };

  const clear = () => setArray([]);

  return {
    array,
    push,
    unshift,
    enqueue,
    pop,
    shift,
    dequeue,
    filter,
    update,
    remove,
    clear,
  };
};

export default useArray;
