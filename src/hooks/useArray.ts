'use client';

import {useState} from 'react';

const useArray = <T = any>(defaultValue: Array<T> | (() => Array<T>)) => {
  const [array, setArray] = useState<Array<T>>(defaultValue);

  const push = (...elements: Array<T>) => {
    setArray(arr => [...arr, ...elements]);
  };

  const unshift = (...elements: Array<T>) => {
    setArray(arr => [...elements, ...arr]);
  };

  const enqueue = (element: T) => {
    setArray(arr => [...arr, element]);
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
