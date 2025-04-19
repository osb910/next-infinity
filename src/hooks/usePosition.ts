'use client';

import {RefObject, useLayoutEffect, useRef, useState} from 'react';
import useWindowSize from './useWindowSize';

export type Position = {
  top: number;
  left: number;
  bottom: number;
  right: number;
  width: number;
  height: number;
};

const usePosition = <T extends HTMLElement = HTMLElement>(
  deps: Array<unknown>
): [Position, RefObject<T | null>] => {
  const ref = useRef<T>(null);
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: 0,
    height: 0,
  });

  const {width, height} = useWindowSize();

  useLayoutEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPosition({
        top: rect.top,
        left: rect.left,
        bottom: rect.bottom,
        right: rect.right,
        width: rect.width,
        height: rect.height,
      });
    }
    // eslint-disable-next-line
  }, [width, height, ...deps]);

  return [position, ref];
};

export default usePosition;
