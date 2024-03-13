'use client';

import {useState, useLayoutEffect} from 'react';

const useWindowSize = (): [number, number] => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    const resize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return [windowDimensions.width, windowDimensions.height];
};

export default useWindowSize;
