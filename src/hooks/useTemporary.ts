'use client';

import {useState, useEffect} from 'react';

export interface Options {
  times?: number;
  delay?: number;
}

export interface NavigationEntry extends PerformanceEntry {
  type: string;
}

const useTemporary = (cb: () => void, {times = 1, delay = 0}: Options = {}) => {
  const [visitNum, setVisitNum] = useState<number>(() => {
    try {
      const stored = localStorage.getItem('visitNum');
      return stored ? +stored : 0;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    const timeout = setTimeout(() => visitNum <= times - 1 && cb(), delay);

    const incrementVisitNum = () => {
      setVisitNum((current) => current + 1);
      try {
        localStorage.setItem('visitNum', String(visitNum + 1));
      } catch (error) {
        console.warn('Failed to save visit number to localStorage:', error);
      }
    };

    window.addEventListener('beforeunload', incrementVisitNum);

    const entries = window.performance.getEntriesByType(
      'navigation'
    ) as NavigationEntry[];

    if (entries.some((nav) => nav.type === 'reload')) {
      console.log('reloaded');
    }

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('beforeunload', incrementVisitNum);
    };
  }, [cb, delay, times, visitNum]);
};

export default useTemporary;
