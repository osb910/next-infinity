'use client';

import {type RefObject} from 'react';
import useEffectOnce from './useEffectOnce';
import useEventListener from './useEventListener';
import useTimeout from './useTimeout';

export interface UseLongClickOptions {
  delay?: number;
}

// Type for the hook itself
export type UseLongClick = {
  <T extends HTMLElement>(
    ref: RefObject<T>,
    callback: () => void,
    options?: UseLongClickOptions
  ): void;
};

const useLongClick: UseLongClick = (ref, cb, {delay = 250} = {}) => {
  const {reset, clear} = useTimeout(cb, delay);
  useEffectOnce(clear);

  useEventListener<HTMLElement, 'mousedown'>('mousedown', reset, ref.current);
  useEventListener<HTMLElement, 'touchstart'>('touchstart', reset, ref.current);

  useEventListener<HTMLElement, 'mouseup'>('mouseup', clear, ref.current);
  useEventListener<HTMLElement, 'mouseleave'>('mouseleave', clear, ref.current);
  useEventListener<HTMLElement, 'touchend'>('touchend', clear, ref.current);
};

export default useLongClick;
