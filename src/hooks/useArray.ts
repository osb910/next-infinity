'use client';

import {useState} from 'react';

export type Obj = {[x: string]: any};

const resolve = (path: string, obj: Obj) => {
  return path.split('.').reduce(function (prev, curr) {
    return prev ? prev[curr] : null;
  }, obj);
};

const useArray = <T = any>(defaultValue: Array<T> | (() => Array<T>)) => {
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
              !array.some(a => {
                const addedProp =
                  typeof unique === 'string' ? resolve(unique, a as Obj) : a;
                const elProp =
                  typeof unique === 'string' ? resolve(unique, el as Obj) : el;
                return addedProp === elProp;
              })
          )
        : added;
      setArray(arr => [...arr, ...toBeAdded]);
    } else {
      const addedExists = array.some(el => {
        const addedProp =
          typeof unique === 'string' ? resolve(unique, el as Obj) : el;
        const elProp =
          typeof unique === 'string' ? resolve(unique, added as Obj) : added;
        return addedProp === elProp;
      });
      if (unique && addedExists) return;
      setArray(arr => [...arr, added]);
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
              !array.some(a => {
                const addedProp =
                  typeof unique === 'string' ? resolve(unique, a as Obj) : a;
                const elProp =
                  typeof unique === 'string' ? resolve(unique, el as Obj) : el;
                return addedProp === elProp;
              })
          )
        : added;
      setArray(arr => [...toBeAdded, ...arr]);
    } else {
      const addedExists = array.some(el => {
        const addedProp =
          typeof unique === 'string' ? resolve(unique, el as Obj) : el;
        const elProp =
          typeof unique === 'string' ? resolve(unique, added as Obj) : added;
        return addedProp === elProp;
      });
      if (unique && addedExists) return;
      setArray(arr => [added, ...arr]);
    }
  };

  const enqueue = (added: T, {unique = false}: {unique?: string | boolean}) => {
    const addedExists = array.some(el => {
      const addedProp =
        typeof unique === 'string' ? resolve(unique, el as Obj) : el;
      const elProp =
        typeof unique === 'string' ? resolve(unique, added as Obj) : added;
      return addedProp === elProp;
    });
    if (unique && addedExists) return;

    setArray(arr => [...arr, added]);
  };

  const pop = (qty?: number) => {
    let removed;
    setArray(arr => {
      if (qty && qty < 1) return arr;
      const kept = arr.slice(0, (qty ?? 1) * -1);
      removed = arr.slice(arr.length - (qty ?? 1));
      return kept;
    });
    return removed;
  };

  const shift = (qty?: number) => {
    let removed;
    setArray(arr => {
      if (qty && qty < 1) return arr;
      const kept = arr.slice(qty ?? 1);
      removed = arr.slice(0, qty ?? 1);
      return kept;
    });
    return removed;
  };

  const dequeue = () => {
    let removed;
    setArray(arr => {
      const [first, ...rest] = arr;
      removed = first;
      return rest;
    });
    return removed;
  };

  const filter = (cb: (v: T, idx: number, arr: Array<T>) => boolean) => {
    setArray(arr => arr.filter(cb));
  };

  const update = (idx: number, newElement: T) => {
    setArray(arr => [...arr.slice(0, idx), newElement, ...arr.slice(idx + 1)]);
  };

  const remove = (...indexes: Array<number>) => {
    const newArr: Array<T> = [];
    const removed: Array<T> = [];
    array.forEach((el, idx) => {
      indexes.includes(idx) ? removed.push(el) : newArr.push(el);
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
