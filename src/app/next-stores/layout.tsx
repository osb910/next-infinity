import {Metadata} from 'next';
import Link from 'next/link';
import styles from './HomePage.module.css';
import NavLink from './NavLink';
import Image from 'next/image';
import Search from './Search';

export const metadata: Metadata = {};

interface MenuItem {
  slug: string;
  icon: string;
  title: string;
}

interface User {
  hearts?: any[];
  gravatar: string;
}

const menu: MenuItem[] = [
  {slug: '/next-stores/stores', title: 'Stores', icon: 'store'},
  {slug: '/next-stores/tags', title: 'Tags', icon: 'tag'},
  {slug: '/next-stores/top', title: 'Top', icon: 'top'},
  {slug: '/next-stores/add', title: 'Add', icon: 'add'},
  {slug: '/next-stores/map', title: 'Map', icon: 'map'},
];

//           rel="shortcut icon"
//           type="image/png"
//           href="/images/icons/doughnut.png"
//         />

const RootLayout = async ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <header>
        <div className='top'>
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
                    <Image
                      src={`/img/icons/${item.icon}.svg`}
                      alt='Logo'
                      width={32}
                      height={32}
                    />
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
            {/* <section className={`${styles.navSection} ${styles.navSectionUser}>
              {user ? (
                <React.Fragment>
                  <li className='nav__item'>
                    <NavLink
                    activeClassName={styles.navLinkActive}
                      className={styles.navLink}
                      href='/hearts'
                    >
                      {getIcon('heart.svg')}
                      <span className='heart-count'>
                        {user.hearts && user.hearts.length}
                      </span>
                    </NavLink>
                  </li>
                  <li className='nav__item'>
                    <NavLink
                    activeClassName={styles.navLinkActive}
                      className={styles.navLink}
                      href='/logout'
                    >
                      {getIcon('logout.svg')}
                      <span>Logout</span>
                    </NavLink>
                  </li>
                  <li className='nav__item'>
                    <NavLink
                    activeClassName={styles.navLinkActive}
                      className={styles.navLink}
                      href='/account'
                    >
                      <img
                        className='avatar'
                        src={user.gravatar + '&d=retro'}
                      />
                    </NavLink>
                  </li>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <li className='nav__item'>
                    <NavLink
                    activeClassName={styles.navLinkActive}
                      className={styles.navLink}
                      href='/register'
                    >
                      Register
                    </NavLink>
                  </li>
                  <li className='nav__item'>
                    <NavLink
                    activeClassName={styles.navLinkActive}
                      className={styles.navLink}
                      href='/login'
                    >
                      Log In
                    </NavLink>
                  </li>
                </React.Fragment>
              )} */}
          </nav>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default RootLayout;
