'use client';

import {motion} from 'framer-motion';
import clsx from 'clsx';
import {useNav} from './useNav';
import type {NavItemProps} from './types';
import {type FocusEvent, type MouseEvent} from 'react';
import cls from './Nav.module.css';

export const NavItem = ({
  slug,
  children,
  highlightClass,
  highlightStyle,
  backdropProps,
  ...rest
}: NavItemProps) => {
  const {hoveredItem, changeHovered, pathName, layoutId} = useNav();

  return (
    <motion.li
      {...rest}
      className={clsx(cls.navItem, rest.className)}
      style={{...rest.style, zIndex: hoveredItem === slug ? 1 : 2}}
      onMouseEnter={(evt: MouseEvent<HTMLLIElement>) => {
        rest.onMouseEnter?.(evt);
        changeHovered(slug);
      }}
      onFocus={(evt: FocusEvent<HTMLLIElement>) => {
        rest.onFocus?.(evt);
        changeHovered(slug);
      }}
    >
      {(hoveredItem === slug || pathName === slug) && (
        <motion.div
          layoutId={layoutId}
          className={clsx(highlightClass, cls.backdrop)}
          initial={highlightStyle}
          transition={{
            type: 'spring',
            damping: 24,
            stiffness: 400,
          }}
          {...backdropProps}
        />
      )}
      {children}
    </motion.li>
  );
};
