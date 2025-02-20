'use client';

import {useState, type RefObject} from 'react';
import useEventListener from './useEventListener';

export type UseHover = {
  <T extends HTMLElement>(ref: RefObject<T>): boolean;
};

const useHover: UseHover = <T extends HTMLElement>(
  ref: RefObject<T>
): boolean => {
  const [hovered, setHovered] = useState(false);

  useEventListener<HTMLElement, 'mouseover'>(
    'mouseover',
    () => setHovered(true),
    ref.current
  );
  useEventListener<HTMLElement, 'mouseout'>(
    'mouseout',
    () => setHovered(false),
    ref.current
  );

  return hovered;
};

export default useHover;
