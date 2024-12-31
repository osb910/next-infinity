'use client';

import {useRef} from 'react';

const usePrevious = <T>(value: T): T | undefined => {
  const current = useRef<T | undefined>(undefined);
  const previous = useRef<T | undefined>(undefined);

  if (current.current !== value) {
    previous.current = current.current;
    current.current = value;
  }

  return previous.current;
};

export default usePrevious;
