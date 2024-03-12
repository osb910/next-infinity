'use client';

import {motion, LayoutGroup} from 'framer-motion';
import type {NavProps} from './types';
import {useNav} from './useNav';
import cls from './Nav.module.css';
import clsx from 'clsx';
import Burger from '../Burger';

export const Nav = ({
  children,
  useBurger = false,
  burgerClass,
  overlayClass,
  ...rest
}: NavProps) => {
  const {isOpen, toggleNav, changeHovered} = useNav();
  return (
    <LayoutGroup>
      {isOpen && (
        <div
          onClick={() => toggleNav(false)}
          className={clsx(cls.overlay, overlayClass)}
        />
      )}
      <motion.nav
        {...rest}
        className={clsx(cls.nav, isOpen ? cls.open : '', rest.className)}
        // BUG: doesn't cancel hover, works in NavList
        onMouseLeave={() => changeHovered('')}
        // BUG: doesn't cancel hover, works in NavList
        onBlur={() => changeHovered('')}
      >
        {useBurger && (
          <Burger
            isOpen={isOpen}
            color='var(--blog-decorative-800)'
            size='0.875em'
            className={burgerClass}
            onClick={() => toggleNav()}
          />
        )}
        {children}
      </motion.nav>
    </LayoutGroup>
  );
};

export default Nav;
