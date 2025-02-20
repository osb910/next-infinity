'use client';

import {useEffect, useRef} from 'react';

const useRenderCount = (): number => {
  const count = useRef<number>(1);

  useEffect(() => {
    count.current++;
  });

  return count.current;
};

export default useRenderCount;
