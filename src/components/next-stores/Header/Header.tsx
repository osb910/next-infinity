import {BiStore} from 'react-icons/bi';
import {BsTags, BsTrophy} from 'react-icons/bs';
import {MdOutlineAddBox} from 'react-icons/md';
import {PiMapPinLine} from 'react-icons/pi';
import Search from '@/components/next-stores/Search';
import UserNav from '@/components/next-stores/UserNav';
import Logo from '@/components/next-stores/Logo';
import Nav, {NavItem, NavLink, NavList} from '@/ui/Nav';
import {type ComponentType} from 'react';
import styles from './Header.module.css';
import {IUser} from '@/services/next-stores/user';

interface MenuItem {
  slug: string;
  icon: string | ComponentType;
  title: string;
}

const menu: MenuItem[] = [
  {slug: '/next-stores/stores', title: 'Stores', icon: BiStore},
  {slug: '/next-stores/tags', title: 'Tags', icon: BsTags},
  {slug: '/next-stores/top', title: 'Top', icon: BsTrophy},
  {slug: '/next-stores/add', title: 'Add', icon: MdOutlineAddBox},
  {slug: '/next-stores/map', title: 'Map', icon: PiMapPinLine},
];

type User = IUser & {gravatar?: string};

interface HeaderProps {
  user: User | null;
}

const highlightStyle = {
  borderBlockEndColor: 'rgba(20, 20, 60, 0.4)',
  borderInlineEndColor: 'rgba(0, 0, 0, 0.15)',
  background: `linear-gradient(
    90deg,
    hsla(50, 82%, 78%, 0.8) 0% 8%,
    hsla(32, 68%, 45%, 0.8) 35% 65%,
    hsla(50, 82%, 78%, 0.8) 92% 100%
  )`,
};

const Header = ({user}: HeaderProps) => {
  const navLinks = menu
    .filter(({title}) => !(title === 'Add' && !user))
    .map(item => {
      return {
        slug: item.slug,
        label: (
          <>
            <item.icon />
            <span>{item.title}</span>
          </>
        ),
      };
    });
  navLinks.unshift({slug: '/next-stores', label: <Logo width='10rem' />});
  return (
    <header className={styles.top}>
      <Nav className={styles.nav}>
        <NavList>
          {navLinks.map(({slug, label}) => (
            <NavItem
              key={slug}
              slug={slug}
              className={styles.navItem}
              highlightClass={styles.navLinkActive}
              highlightStyle={highlightStyle}
            >
              <NavLink
                highlightClass={styles.navLinkActive}
                highlightStyle={highlightStyle}
                className={`${styles.navLink}`}
                href={slug}
              >
                {label}
              </NavLink>
            </NavItem>
          ))}
        </NavList>
        <section className={`${styles.navSection} ${styles.navSectionSearch}`}>
          <Search />
        </section>
        <UserNav user={user} logoutEndpoint='/api/next-stores/auth/logout' />
      </Nav>
    </header>
  );
};

export default Header;
