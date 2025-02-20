'use client';

import {RefObject} from 'react';
import useEffectOnce from './useEffectOnce';
import useEventListener from './useEventListener';
import useTimeout from './useTimeout';

interface UseLongPressOptions {
  delay?: number;
  targetKey?: string;
}

type UseLongPress = {
  <T extends HTMLElement>(
    ref: RefObject<T>,
    cb: () => void,
    options?: UseLongPressOptions
  ): void;
};

const useLongPress: UseLongPress = (ref, cb, {delay = 250, targetKey} = {}) => {
  const {reset, clear} = useTimeout(cb, delay);
  useEffectOnce(clear);

  useEventListener<HTMLElement, 'keydown'>(
    'keydown',
    (evt) => {
      if (!targetKey || evt.key === targetKey) {
        evt.preventDefault();
        reset();
      }
    },
    ref.current
  );

  useEventListener<HTMLElement, 'keyup'>(
    'keyup',
    (evt) => {
      if (!targetKey || evt.key === targetKey) {
        clear();
      }
    },
    ref.current
  );

  useEventListener<HTMLElement, 'blur'>('blur', clear, ref.current);
};

export default useLongPress;
