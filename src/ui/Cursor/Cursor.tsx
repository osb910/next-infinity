'use client';

import AnimatedCursor from 'react-animated-cursor';
import {useEffect, useState} from 'react';
import type {CSSProperties} from 'react';

export interface AnimatedCursorOptions {
  color?: string;
  innerScale?: number;
  innerSize?: number;
  innerStyle?: CSSProperties;
  outerAlpha?: number;
  outerScale?: number;
  outerSize?: number;
  outerStyle?: CSSProperties;
}

// export interface CursorProps extends AnimatedCursorOptions {
// color?: string;
// }

// Extract clickables to constant for better maintainability
const DEFAULT_CLICKABLES = [
  'a',
  'input[type="text"]',
  'input[type="email"]',
  'input[type="number"]',
  'input[type="submit"]',
  'input[type="image"]',
  'label[for]',
  'select',
  'textarea',
  'button',
  '.link',
] as const;

const Cursor = ({
  color = 'var(--cursor-color, #fff)',
  innerSize = 9,
  outerSize = 35,
  innerScale = 1.4,
  outerScale = 0.6,
  outerAlpha = 0,
  outerStyle,
  innerStyle,
  ...rest
}: AnimatedCursorOptions) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check for touch support and coarse pointer
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsTouchDevice(!mediaQuery.matches);

    const handler = (evt: MediaQueryListEvent) =>
      setIsTouchDevice(!evt.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  if (isTouchDevice) return null;
  // Separate custom styles from rest props
  const cursorStyles = {
    outer: {
      border: `1px solid ${color}`,
      ...outerStyle,
    } as CSSProperties,
    inner: {
      backgroundColor: color,
      ...innerStyle,
    } as CSSProperties,
  };

  return (
    <AnimatedCursor
      innerSize={innerSize}
      outerSize={outerSize}
      innerScale={innerScale}
      outerScale={outerScale}
      outerAlpha={outerAlpha}
      outerStyle={cursorStyles.outer}
      innerStyle={cursorStyles.inner}
      clickables={[...DEFAULT_CLICKABLES]}
      {...rest}
    />
  );
};

export default Cursor;
