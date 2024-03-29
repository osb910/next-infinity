import type {MotionProps, MotionStyle} from 'framer-motion';
import {type LinkProps} from 'next/link';
import type {
  CSSProperties,
  ComponentProps,
  ComponentPropsWithoutRef,
  ReactNode,
} from 'react';

export type NavProps = ComponentPropsWithoutRef<'nav'> &
  Partial<MotionProps> & {
    children: ReactNode;
    useBurger?: boolean;
    burgerClass?: string;
    overlayClass?: string;
  };

export type NavListProps = ComponentPropsWithoutRef<'ul'> &
  Partial<MotionProps> & {
    children: ReactNode;
  };

export type NavItemProps = ComponentPropsWithoutRef<'li'> &
  Partial<MotionProps> & {
    slug: string;
    children: ReactNode;
    highlightClass?: string;
    highlightStyle?: Record<string, any>;
  };
export type NavLinkProps = ComponentPropsWithoutRef<'a'> &
  LinkProps & {
    highlightClass?: string;
    highlightStyle?: Record<string, any>;
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
