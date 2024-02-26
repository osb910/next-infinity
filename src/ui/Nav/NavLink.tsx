'use client';

import Link from 'next/link';
import {useNav} from './useNav';
import {type FocusEvent, type MouseEvent} from 'react';
import type {NavLinkProps} from './types';
import cls from './Nav.module.css';
import clsx from 'clsx';

export const NavLink = ({
  highlightClass,
  highlightStyle,
  slug,
  children,
  ...rest
}: NavLinkProps) => {
  const {changeHovered, pathName} = useNav();
  const path = slug ?? rest.href;

  return (
    <Link
      prefetch={true}
      {...rest}
      className={clsx(
        cls.navLink,
        rest.className,
        pathName === path ? highlightClass : ''
      )}
      style={
        pathName === path ? {...rest.style, ...highlightStyle} : rest.style
      }
      onMouseEnter={(evt: MouseEvent<HTMLAnchorElement>) => {
        rest.onMouseEnter?.(evt);
        changeHovered(path);
      }}
      onFocus={(evt: FocusEvent<HTMLAnchorElement>) => {
        rest.onFocus?.(evt);
        changeHovered(path);
      }}
    >
      {children}
    </Link>
  );
};
