'use client';

import Link from 'next/link';
import {useNav} from './useNav';
import {type FocusEvent, type MouseEvent} from 'react';
import styles from './Nav.module.css';
import type {NavLinkProps} from './types';

export const NavLink = ({
  highlightClass,
  highlightStyle,
  slug,
  children,
  ...delegated
}: NavLinkProps) => {
  const {changeHovered, pathName} = useNav();
  const path = slug ?? delegated.href;

  return (
    <Link
      prefetch={true}
      {...delegated}
      className={`${styles.navLink} ${
        pathName === path ? highlightClass : ''
      } ${delegated.className ?? ''}`}
      style={
        pathName === path
          ? {...delegated.style, ...highlightStyle}
          : delegated.style
      }
      onMouseEnter={(evt: MouseEvent<HTMLAnchorElement>) => {
        delegated.onMouseEnter?.(evt);
        changeHovered(path);
      }}
      onFocus={(evt: FocusEvent<HTMLAnchorElement>) => {
        delegated.onFocus?.(evt);
        changeHovered(path);
      }}
    >
      {children}
    </Link>
  );
};
