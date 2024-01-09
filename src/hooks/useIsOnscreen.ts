'use client';

import {useState, useEffect, useRef, RefObject} from 'react';

const useIsOnscreen = (
  selector?: string
): [boolean, RefObject<HTMLElement>] => {
  const [isOnscreen, setIsOnscreen] = useState<boolean>(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const [entry] = entries;
      setIsOnscreen(entry.isIntersecting);
    });

    const element = selector
      ? document.querySelector(selector)
      : elementRef.current;

    if (!element) return;

    observer.observe(element);

    return () => observer.disconnect();
  }, [selector, elementRef]);

  return [isOnscreen, elementRef];
};

export default useIsOnscreen;
