'use client';

import {motion} from 'framer-motion';
import {useNav} from './useNav';
import type {NavItemProps} from './types';
import styles from './Nav.module.css';
import {FocusEvent, MouseEvent} from 'react';

export const NavItem = ({
  slug,
  children,
  highlightClass,
  highlightStyle,
  ...delegated
}: NavItemProps) => {
  const {hoveredItem, changeHovered, pathName, layoutId} = useNav();

  return (
    <motion.li
      {...delegated}
      className={`${styles.navItem} ${delegated.className ?? ''}`}
      style={{...delegated.style, zIndex: hoveredItem === slug ? 1 : 2}}
      onMouseEnter={(evt: MouseEvent<HTMLLIElement>) => {
        delegated.onMouseEnter?.(evt);
        changeHovered(slug);
      }}
      onFocus={(evt: FocusEvent<HTMLLIElement>) => {
        delegated.onFocus?.(evt);
        changeHovered(slug);
      }}
    >
      {(hoveredItem === slug || pathName === slug) && (
        <motion.div
          layoutId={layoutId}
          className={`${highlightClass ?? ''} ${styles.backdrop}`}
          initial={highlightStyle}
          transition={{
            type: 'spring',
            damping: 26,
            stiffness: 380,
          }}
        />
      )}
      {children}
    </motion.li>
  );
};
