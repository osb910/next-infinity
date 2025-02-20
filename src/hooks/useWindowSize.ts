'use client';

import {useLayoutEffect, useState} from 'react';
import useEventListener from './useEventListener';

export interface WindowSize {
  width: number;
  height: number;
}

export interface WindowSizeOptions {
  initialWidth?: number;
  initialHeight?: number;
  debounceDelay?: number;
}

const getWindowSize = (): WindowSize => {
  // Check if window is defined (for SSR)
  const isClient = typeof window !== 'undefined';

  return {
    width: isClient ? window.innerWidth : 0,
    height: isClient ? window.innerHeight : 0,
  };
};

// Debounce helper function
const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const useWindowSize = (options: WindowSizeOptions = {}): WindowSize => {
  const {initialWidth = 0, initialHeight = 0, debounceDelay = 250} = options;

  const [windowDimensions, setWindowSize] = useState<WindowSize>({
    width: initialWidth,
    height: initialHeight,
  });

  // Initialize on mount with actual window size
  useLayoutEffect(() => {
    setWindowSize(getWindowSize());
  }, []);

  const handleResize = debounce(() => {
    setWindowSize(getWindowSize());
  }, debounceDelay);

  // Add event listener with cleanup
  useEventListener('resize', handleResize);

  return {width: windowDimensions.width, height: windowDimensions.height};
};

export default useWindowSize;
