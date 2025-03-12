import type {HTMLMotionProps} from 'framer-motion';
import {type LinkProps} from 'next/link';
import type {ComponentPropsWithoutRef, ReactNode} from 'react';

export type NavProps = ComponentPropsWithoutRef<'nav'> &
  HTMLMotionProps<'nav'> & {
    children: ReactNode;
    useBurger?: boolean;
    burgerClass?: string;
    overlayClass?: string;
  };

export type NavListProps = ComponentPropsWithoutRef<'ul'> &
  HTMLMotionProps<'ul'> & {
    children: ReactNode;
  };

export type NavItemProps = ComponentPropsWithoutRef<'li'> &
  HTMLMotionProps<'li'> & {
    slug: string;
    children: ReactNode;
    highlightClass?: string;
    highlightStyle?: Record<string, string | number>;
    backdropProps?: ComponentPropsWithoutRef<'div'> & HTMLMotionProps<'div'>;
  };
export type NavLinkProps = ComponentPropsWithoutRef<'a'> &
  LinkProps & {
    highlightClass?: string;
    highlightStyle?: Record<string, string | number>;
    slug?: string;
    external?: boolean;
  };

export interface NavContextProps {
  isOpen: boolean;
  toggleNav: (bool?: boolean) => void;
  hoveredItem: string;
  changeHovered: (slug: string) => void;
  pathName: string;
  layoutId: string;
}
