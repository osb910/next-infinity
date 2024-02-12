'use client';

import {motion, LayoutGroup} from 'framer-motion';
import {RxHamburgerMenu} from 'react-icons/rx';
import type {NavProps} from './types';
import {useNav, NavProvider} from './useNav';
import styles from './Nav.module.css';

export const Nav = ({children, useBurger = false, ...delegated}: NavProps) => {
  const {isOpen, closeNav, toggleNav, changeHovered} = useNav();
  return (
    <NavProvider>
      <LayoutGroup>
        <motion.nav
          {...delegated}
          className={`${styles.nav} ${isOpen ? styles.open : ''} ${
            delegated.className ?? ''
          }`}
          // BUG: doesn't cancel hover, works in NavList
          onMouseLeave={() => changeHovered('')}
          // BUG: doesn't cancel hover, works in NavList
          onBlur={() => changeHovered('')}
        >
          {isOpen && <div onClick={closeNav} className={styles.overlay} />}
          {children}
          {useBurger && (
            <RxHamburgerMenu onClick={toggleNav} className={styles.burger} />
          )}
        </motion.nav>
      </LayoutGroup>
    </NavProvider>
  );
};

export default Nav;
