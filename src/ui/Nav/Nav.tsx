'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useId, useState, type ReactNode, type ComponentProps} from 'react';
import {motion} from 'framer-motion';
import {RxHamburgerMenu} from 'react-icons/rx';
import styles from './Nav.module.css';

export interface NavProps extends ComponentProps<'nav'> {
  children: ReactNode;
  useBurger?: boolean;
}

export interface NavListProps extends ComponentProps<'ul'> {
  items: Array<{
    href: string;
    label: ReactNode;
  }>;
  highlightClass: string;
  highlightStyle?: Record<string, any>;
  linkClass: string;
  navItemClass?: string;
  transition?: Record<string, any>;
  children?: ReactNode;
}

export const NavList = ({
  items,
  highlightClass,
  highlightStyle,
  navItemClass,
  linkClass,
  transition,
  children,
  ...delegated
}: NavListProps) => {
  const pathName = usePathname();
  const [hoveredItem, setHoveredItem] = useState('');
  const layoutId = `nav-backdrop${useId()}`;

  return (
    <>
      <ul
        {...delegated}
        onMouseLeave={() => setHoveredItem('')}
        onBlur={() => setHoveredItem('')}
        className={`${styles.navList} ${delegated.className ?? ''}`}
      >
        {items.map(({href, label}) => (
          <motion.li
            key={href}
            className={`${styles.navItem} ${navItemClass}`}
            style={{zIndex: hoveredItem === href ? 1 : 2}}
          >
            {(hoveredItem === href || pathName === href) && (
              <motion.div
                layoutId={layoutId}
                className={`${highlightClass} ${styles.backdrop}`}
                initial={{...highlightStyle}}
                transition={{
                  type: 'spring',
                  damping: 26,
                  stiffness: 370,
                  ...transition,
                }}
              />
            )}
            <Link
              href={href}
              className={`${linkClass} ${styles.link} ${
                pathName === href ? highlightClass : ''
              }`}
              style={pathName === href ? highlightStyle : {}}
              onMouseEnter={() => setHoveredItem(href)}
              onFocus={() => setHoveredItem(href)}
            >
              {label}
            </Link>
          </motion.li>
        ))}
        {children}
      </ul>
    </>
  );
};

const Nav = ({children, useBurger = false, ...delegated}: NavProps) => {
  const [isNavOpen, setIsNavOpen] = useState(true);

  return (
    <nav
      {...delegated}
      className={`${isNavOpen ? styles.open : ''} ${delegated.className ?? ''}`}
    >
      {isNavOpen && (
        <div onClick={() => setIsNavOpen(false)} className={styles.overlay} />
      )}
      {children}
      {useBurger && (
        <RxHamburgerMenu
          onClick={() => setIsNavOpen(current => !current)}
          className={styles.hamburger}
        />
      )}
    </nav>
  );
};

export default Nav;
