'use client';

import type {NavListProps} from './types';
import {useNav} from './useNav';
import styles from './Nav.module.css';

export const NavList = ({children, ...delegated}: NavListProps) => {
  const {changeHovered} = useNav();
  return (
    <ul
      {...delegated}
      onMouseLeave={() => changeHovered('')}
      onBlur={() => changeHovered('')}
      className={`${styles.navList} ${delegated.className ?? ''}`}
    >
      {children}
    </ul>
  );
};
