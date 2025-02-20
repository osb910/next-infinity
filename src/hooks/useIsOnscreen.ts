'use client';

import {useState, useEffect, useRef, type RefObject} from 'react';

// Types
export interface UseIsOnscreenOptions {
  selector?: string;
  rootMargin?: string;
  threshold?: number | number[];
  root?: Element | Document | null;
  once?: boolean; // Stop observing after first appearance
  defaultValue?: boolean; // Initial visibility state
}

export interface UseIsOnscreenReturn {
  isVisible: boolean;
  elementRef: RefObject<HTMLElement | null>;
  entry: IntersectionObserverEntry | null;
  reset: () => void; // Function to reset the visibility state
}

export type UseIsOnscreen = (
  options?: UseIsOnscreenOptions
) => UseIsOnscreenReturn;

/**
 * Custom hook to detect if an element is visible in the viewport
 * @param options Configuration options for the intersection observer
 * @returns Object containing visibility state and element reference
 */

const useIsOnscreen: UseIsOnscreen = ({
  selector,
  rootMargin = '0px',
  threshold = 0,
  root = null,
  once = false,
  defaultValue = false,
} = {}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const elementRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Reset function
  const reset = () => {
    setIsVisible(defaultValue);
    setEntry(null);

    // Re-observe the element if it exists
    const element = selector
      ? document.querySelector<HTMLElement>(selector)
      : elementRef.current;

    if (element && observerRef.current) {
      observerRef.current.observe(element);
    }
  };

  useEffect(() => {
    // Early return if we're in a non-browser environment
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      console.warn('IntersectionObserver is not supported in this environment');
      return;
    }

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      setEntry(entry);

      if (entry.isIntersecting) {
        setIsVisible(true);

        // If once is true, disconnect the observer after first visibility
        if (once && observerRef.current) {
          observerRef.current.disconnect();
        }
      } else {
        // Only update visibility to false if 'once' is false
        if (!once) {
          setIsVisible(false);
        }
      }
    };

    // Create new IntersectionObserver
    observerRef.current = new IntersectionObserver(handleIntersect, {
      root,
      rootMargin,
      threshold,
    });

    const element = selector
      ? document.querySelector<HTMLElement>(selector)
      : elementRef.current;

    if (!element) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          `Target element ${
            selector ? `with selector "${selector}"` : ''
          } not found`
        );
      }
      return;
    }

    // Start observing
    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [selector, rootMargin, threshold, root, once]);

  return {isVisible, elementRef, entry, reset};
};

export default useIsOnscreen;
