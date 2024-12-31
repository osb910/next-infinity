'use client';

import {useCallback, useRef, useState} from 'react';

const useHistoryState = <T>(
  defaultValue: T,
  {capacity = 10}: {capacity?: number} = {}
) => {
  const [value, setValue] = useState<T>(defaultValue);
  const history = useRef<T[]>([value]);
  const pointer = useRef<number>(0);

  const set = useCallback(
    (v: T | ((value: T) => T)) => {
      const resolvedValue =
        typeof v === 'function' ? (v as (value: T) => T)(value) : v;
      if (history.current[pointer.current] !== resolvedValue) {
        if (pointer.current < history.current.length - 1) {
          history.current.splice(pointer.current + 1);
        }
        history.current.push(resolvedValue);

        while (history.current.length > capacity) {
          history.current.shift();
        }
        pointer.current = history.current.length - 1;
      }
      setValue(resolvedValue);
    },
    [capacity, value]
  );

  const back = useCallback(() => {
    if (pointer.current <= 0) return;
    pointer.current--;
    setValue(history.current[pointer.current]);
  }, []);

  const forward = useCallback(() => {
    if (pointer.current >= history.current.length - 1) return;
    pointer.current++;
    setValue(history.current[pointer.current]);
  }, []);

  const go = useCallback((idx: number) => {
    if (idx < 0 || idx > history.current.length - 1) return;
    pointer.current = idx;
    setValue(history.current[pointer.current]);
  }, []);

  return [
    value,
    set,
    {
      history: history.current,
      pointer: pointer.current,
      back,
      forward,
      go,
    },
  ];
};

export default useHistoryState;
