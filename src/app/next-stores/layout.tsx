import {Metadata} from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {cookies, headers} from 'next/headers';
import {ReactNode, ComponentType} from 'react';
import {BiStore} from 'react-icons/bi';
import {BsTags, BsTrophy} from 'react-icons/bs';
import {MdOutlineAddBox} from 'react-icons/md';
import {PiMapPinLine} from 'react-icons/pi';
import styles from './HomePage.module.css';
import NavLink from '../../components/next-stores/NavLink';
import Search from '../../components/next-stores/Search';
import {getURL} from '@/utils/path';

export const metadata: Metadata = {};

interface MenuItem {
  slug: string;
  icon: string | ComponentType;
  title: string;
}

interface User {
  hearts?: any[];
  gravatar: string;
}

const menu: MenuItem[] = [
  {slug: '/next-stores/stores', title: 'Stores', icon: BiStore},
  {slug: '/next-stores/tags', title: 'Tags', icon: BsTags},
  {slug: '/next-stores/top', title: 'Top', icon: BsTrophy},
  {slug: '/next-stores/add', title: 'Add', icon: MdOutlineAddBox},
  {slug: '/next-stores/map', title: 'Map', icon: PiMapPinLine},
];

//           rel="shortcut icon"
//           type="image/png"
//           href="/images/icons/doughnut.png"
//         />

const RootLayout = async ({children}: {children: ReactNode}) => {
  const cookieStore = cookies();
  const headersStore = headers();
  const userId = headersStore.get('X-USER-ID');
  const loggedIn = cookieStore.get('next-stores-logged-in')?.value === 'true';
  let user;
  try {
    const res = await fetch(getURL(`/api/next-stores/users/me`), {
      headers: {
        'X-USER-ID': userId ?? '',
      },
    });
    user = await res.json();
  } catch (err) {
    console.error(err);
  }
  return (
    <>
      <header className={styles.top}>
        <nav className={styles.nav}>
          <section className={styles.navSection}>
            <li className={styles.navItem}>
              <Link
                className={`${styles.navLink} ${styles.navLinkLogo}`}
                href='/next-stores'
              >
                <Image
                  src='/img/icons/logo.svg'
                  alt='Logo'
                  width={32}
                  height={32}
                />
              </Link>
            </li>
            {menu.map((item, idx) => (
              <li className={styles.navItem} key={idx}>
                <NavLink
                  activeClassName={styles.navLinkActive}
                  className={`${styles.navLink}`}
                  href={item.slug}
                >
                  <item.icon />
                  <span>{item.title}</span>
                </NavLink>
              </li>
            ))}
          </section>
          <section
            className={`${styles.navSection} ${styles.navSectionSearch}`}
          >
            <Search />
          </section>
          <ul className={`${styles.navSection} ${styles.navSectionUser}`}>
            {loggedIn ? (
              <>
                <li className={styles.navItem}>
                  <NavLink
                    activeClassName={styles.navLinkActive}
                    className={styles.navLink}
                    href='/hearts'
                  >
                    <Image
                      src='/img/icons/heart.svg'
                      alt='heart'
                      width={32}
                      height={32}
                    />
                    <span className='heart-count'>
                      {user?.hearts && user.hearts.length}
                    </span>
                  </NavLink>
                </li>
                <li className={styles.navItem}>
                  <NavLink
                    activeClassName={styles.navLinkActive}
                    className={styles.navLink}
                    href='/api/next-stores/auth/logout'
                  >
                    <Image
                      src='/img/icons/logout.svg'
                      alt='logout'
                      width={32}
                      height={32}
                    />
                    <span>Logout</span>
                  </NavLink>
                </li>
                <li className={styles.navItem}>
                  <NavLink
                    activeClassName={styles.navLinkActive}
                    className={styles.navLink}
                    href='/account'
                  >
                    <img
                      className='avatar'
                      alt='avatar'
                      src={user?.gravatar + '&d=retro'}
                    />
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className={styles.navItem}>
                  <NavLink
                    activeClassName={styles.navLinkActive}
                    className={styles.navLink}
                    href='/next-stores/register'
                  >
                    Register
                  </NavLink>
                </li>
                <li className={styles.navItem}>
                  <NavLink
                    activeClassName={styles.navLinkActive}
                    className={styles.navLink}
                    href='/next-stores/login'
                  >
                    Log In
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default RootLayout;
