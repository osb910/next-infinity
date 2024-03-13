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
  external,
  ...rest
}: NavLinkProps) => {
  const {changeHovered, pathName, toggleNav} = useNav();
  const path = slug ?? rest.href;

  return (
    <Link
      prefetch={true}
      {...((rest.href.startsWith('http') || external) && {target: '_blank'})}
      {...rest}
      className={clsx(
        cls.navLink,
        rest.className,
        pathName === path ? highlightClass : ''
      )}
      style={
        pathName === path ? {...rest.style, ...highlightStyle} : rest.style
      }
      onClick={(evt: MouseEvent<HTMLAnchorElement>) => {
        toggleNav(false);
        rest.onClick?.(evt);
      }}
      onMouseEnter={(evt: MouseEvent<HTMLAnchorElement>) => {
        changeHovered(path);
        rest.onMouseEnter?.(evt);
      }}
      onFocus={(evt: FocusEvent<HTMLAnchorElement>) => {
        changeHovered(path);
        rest.onFocus?.(evt);
      }}
    >
      {children}
    </Link>
  );
};
