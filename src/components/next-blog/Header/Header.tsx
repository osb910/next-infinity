import {Rss} from 'react-feather';
import Logo from '@/components/next-blog/Logo';
import Nav, {NavItem, NavLink, NavList} from '@/ui/Nav';
import ThemeSwitch from '@/ui/ThemeSwitch';
import SfxSwitch from '@/ui/SfxSwitch';
import Switch from '@/ui/Switch';
import IconButton from '@/ui/IconButton';
import VisuallyHidden from '@/ui/VisuallyHidden';
import cls from './Header.module.css';
import Link from 'next/link';

interface HeaderProps {
  theme: 'light' | 'dark';
  userId: string;
}

const btnAnimation = {
  backgroundColor: 'hsla(0, 0%, 50%, 0.3)',
  boxShadow: '0 0 0 4px hsla(0, 0%, 50%, 0.3)',
};

const navLinks = [
  {to: '/next-blog', label: <Logo width='12rem' />},
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

const Header = ({theme}: HeaderProps) => {
  return (
    <header className={cls.header}>
      <Nav className={cls.nav}>
        <NavList className={`${cls.navBar}`}>
          {navLinks.map(({to, label}, idx) => (
            <NavItem
              slug={to}
              key={to}
              className={cls.navItem}
              highlightClass={cls.highlight}
              highlightStyle={
                idx
                  ? {
                      borderRadius: 6,
                      padding: '0.5em 1em',
                    }
                  : {}
              }
            >
              <NavLink className={cls.navLink} href={to}>
                {label}
              </NavLink>
            </NavItem>
          ))}
        </NavList>
      </Nav>
      <section className={cls.settings}>
        <ThemeSwitch
          initialTheme={theme}
          whileHover={btnAnimation}
          whileFocus={btnAnimation}
          className={cls.themeSwitch}
        />
        <SfxSwitch
          whileHover={btnAnimation}
          whileFocus={btnAnimation}
          className={cls.sfxSwitch}
        />
        <Link href='/api/next-blog/rss'>
          <IconButton
            icon={
              <Rss
                style={{
                  // Optical alignment
                  transform: 'translate(2px, -2px)',
                }}
              />
            }
            whileHover={btnAnimation}
            whileFocus={btnAnimation}
            className={cls.rssBtn}
          >
            <VisuallyHidden>View RSS feed</VisuallyHidden>
          </IconButton>
        </Link>
      </section>
    </header>
  );
};

export default Header;
