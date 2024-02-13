'use client';
import {RxHamburgerMenu} from 'react-icons/rx';
import styles from './NavBar.module.css';
import {useState} from 'react';
import Nav, {NavItem, NavLink, NavList} from '@/ui/Nav';
interface NavBarProps {}

const navLinks = [
  {slug: '/next-blog', label: 'Home'},
  {
    slug: '/next-blog/posts',
    label: 'Posts',
  },
  {
    slug: '/next-blog/categories',
    label: 'Categories',
  },
];

const NavBar = ({}: NavBarProps) => {
  const [isNavOpen, setIsNavOpen] = useState(true);
  return (
    <Nav>
      <NavList className={`${styles.navBar}`}>
        {navLinks.map(({slug, label}) => (
          <NavItem
            slug={slug}
            key={slug}
            highlightClass={styles.highlight}
            highlightStyle={{borderRadius: 8}}
          >
            <NavLink className={styles.navLink} href={slug}>
              {label}
            </NavLink>
          </NavItem>
        ))}
      </NavList>
    </Nav>
  );
};

export default NavBar;
