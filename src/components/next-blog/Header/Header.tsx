import {Rss} from 'react-feather';
import Logo from '@/components/next-blog/Logo';
import Nav, {NavItem, NavLink, NavList} from '@/ui/Nav';
import ThemeSwitch from '@/ui/ThemeSwitch';
import SfxSwitch from '@/ui/SfxSwitch';
import Switch from '@/ui/Switch';
import IconButton from '@/ui/IconButton';
import VisuallyHidden from '@/ui/VisuallyHidden';
import styles from './Header.module.css';

interface HeaderProps {
  theme: 'light' | 'dark';
  userId: string;
}

const btnAnimation = {
  backgroundColor: 'hsla(0, 0%, 50%, 0.3)',
  boxShadow: '0 0 0 4px hsla(0, 0%, 50%, 0.3)',
};

const navLinks = [
  {slug: '/next-blog', label: <Logo width='12rem' />},
  {
    slug: '/next-blog/posts',
    label: 'Posts',
  },
  {
    slug: '/next-blog/categories',
    label: 'Categories',
  },
];

const Header = ({theme}: HeaderProps) => {
  return (
    <header className={styles.header}>
      <Nav className={styles.nav}>
        <NavList className={`${styles.navBar}`}>
          {navLinks.map(({slug, label}, idx) => (
            <NavItem
              slug={slug}
              key={slug}
              className={styles.navItem}
              highlightClass={styles.highlight}
              highlightStyle={
                idx
                  ? {
                      borderRadius: 8,
                      padding: '0.5em 1em',
                    }
                  : {}
              }
            >
              <NavLink className={styles.navLink} href={slug}>
                {label}
              </NavLink>
            </NavItem>
          ))}
        </NavList>
      </Nav>
      <section className={styles.settings}>
        <ThemeSwitch
          initialTheme={theme}
          whileHover={btnAnimation}
          whileFocus={btnAnimation}
          className={styles.themeSwitch}
        />
        <SfxSwitch
          whileHover={btnAnimation}
          whileFocus={btnAnimation}
          className={styles.sfxSwitch}
        />
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
          className={styles.rssBtn}
        >
          <VisuallyHidden>View RSS feed</VisuallyHidden>
        </IconButton>
      </section>
    </header>
  );
};

export default Header;
