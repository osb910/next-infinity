import {useState, useEffect} from 'react';
import useEventListener from './useEventListener';

type MediaQueryEventTarget = MediaQueryList & {
  addEventListener(
    type: 'change',
    listener: (event: MediaQueryListEvent) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener(
    type: 'change',
    listener: (event: MediaQueryListEvent) => void,
    options?: boolean | EventListenerOptions
  ): void;
};

/**
 * Custom hook that matches a media query and returns whether it matches
 * @param mediaQuery - A media query string to match against
 * @returns boolean indicating whether the media query matches
 * @example
 * const isLargeScreen = useMediaQuery('(min-width: 1024px)');
 */
const useMediaQuery = (mediaQuery: string): boolean => {
  const [isMatch, setIsMatch] = useState(false);
  const [mediaQueryList, setMediaQueryList] =
    useState<MediaQueryEventTarget | null>(null);

  useEffect(() => {
    const list = window.matchMedia(mediaQuery) as MediaQueryEventTarget;
    setMediaQueryList(list);
    setIsMatch(list.matches);
  }, [mediaQuery]);

  useEventListener(
    'change',
    (e: MediaQueryListEvent) => setIsMatch(e.matches),
    mediaQueryList
  );

  return isMatch;
};

export default useMediaQuery;
