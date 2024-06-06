'use client';

import {useLayoutEffect, useState} from 'react';

const useScroll = () => {
  const [scrollPos, setScrollPos] = useState(0);
  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('up');

  useLayoutEffect(() => {
    setScrollPos(window.scrollY);
  }, []);

  useLayoutEffect(() => {
    const changeScroll = () => {
      const newScrollPos = window.scrollY;
      setScrollDir(scrollPos > newScrollPos ? 'up' : 'down');
      setScrollPos(newScrollPos);
    };

    window.addEventListener('scroll', changeScroll);

    return () => window.removeEventListener('scroll', changeScroll);
  }, [scrollPos]);

  return {scrollPos, scrollDir};
};

export default useScroll;
