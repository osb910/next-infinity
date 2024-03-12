'use client';

import {motion} from 'framer-motion';
import type {NavListProps} from './types';
import {useNav} from './useNav';
import styles from './Nav.module.css';

export const NavList = ({children, ...delegated}: NavListProps) => {
  const {changeHovered} = useNav();
  return (
    <motion.ul
      {...delegated}
      onMouseLeave={() => changeHovered('')}
      onBlur={() => changeHovered('')}
      className={`${styles.navList} ${delegated.className ?? ''}`}
    >
      {children}
    </motion.ul>
  );
};
