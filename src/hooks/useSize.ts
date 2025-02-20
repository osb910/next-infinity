'use client';

import {useState, useLayoutEffect, type RefObject} from 'react';

// Define the return type for the size object
export type Size = {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
};

const useSize = <T extends HTMLElement>(ref: RefObject<T>): Partial<Size> => {
  const [size, setSize] = useState<Partial<Size>>({});

  useLayoutEffect(() => {
    if (ref.current === null) return;

    const observer = new ResizeObserver(([entry]) => {
      if (entry) {
        setSize(entry.contentRect);
      }
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return size;
};

export default useSize;
