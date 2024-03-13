'use client';

import clsx from 'clsx';
import Nav, {NavItem, NavLink, NavList, useNav} from '@/ui/Nav';
import useWindowSize from '@/hooks/useWindowSize';
import cls from './Navigation.module.css';

export interface NavigationProps {}

const navLinks = [
  {
    to: '/next-blog/posts',
    label: 'Posts',
  },
  {
    to: '/next-blog/categories',
    label: 'Categories',
  },
  {
    to: '/next-blog/contact',
    label: 'Contact',
  },
];

const Navigation = ({}: NavigationProps) => {
  const {isOpen} = useNav();
  const [width] = useWindowSize();
  const insetInlineStart =
    width >= 768 || isOpen ? '0' : width >= 480 ? '-62%' : '-100%';
  return (
    <Nav
      className={clsx(cls.nav, isOpen && cls.open)}
      useBurger
      burgerClass={cls.burger}
      overlayClass={cls.overlay}
    >
      <NavList
        className={`${cls.navBar}`}
        transition={{type: 'spring', damping: 20, stiffness: 150}}
        animate={{insetInlineStart}}
      >
        {navLinks.map(({to, label}) => (
          <NavItem
            slug={to}
            key={to}
            className={cls.navItem}
            highlightClass={cls.highlight}
            highlightStyle={{
              borderRadius: 6,
              padding: '0.5em 1em',
            }}
          >
            <NavLink className={cls.navLink} href={to}>
              {label}
            </NavLink>
          </NavItem>
        ))}
      </NavList>
    </Nav>
  );
};

export default Navigation;
