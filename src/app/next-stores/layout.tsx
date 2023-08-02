import {Metadata} from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {headers} from 'next/headers';
import {ReactNode, ComponentType} from 'react';
import {BiStore} from 'react-icons/bi';
import {BsTags, BsTrophy} from 'react-icons/bs';
import {MdOutlineAddBox} from 'react-icons/md';
import {PiMapPinLine} from 'react-icons/pi';
import styles from './HomePage.module.css';
import NavLink from '../../components/next-stores/NavLink';
import Search from '../../components/next-stores/Search';
import {getURL} from '@/utils/path';
import UserNav from '@/components/next-stores/UserNav';
import {IUser} from '@/entities/next-stores/user/user.model';

export const metadata: Metadata = {};

export const dynamic = 'force-dynamic';

type User = IUser & {gravatar?: string; hearts?: any[]};
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

//           rel="shortcut icon"
//           type="image/png"
//           href="/images/icons/doughnut.png"
//         />

const RootLayout = async ({children}: {children: ReactNode}) => {
  const headersStore = headers();
  const userId = headersStore.get('X-USER-ID');
  let user: any | User;
  if (!user) {
    try {
      const res = await fetch(getURL(`/api/next-stores/users/me`), {
        headers: {
          'X-USER-ID': userId ?? '',
        },
      });
      const json = await res.json();
      if (json.status === 'success') user = json.data;
    } catch (err) {
      console.error(err);
    }
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
                  width={64}
                  height={64}
                />
              </Link>
            </li>
            {menu.map((item, idx) => {
              if (item.title === 'Add' && !user) return null;
              return (
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
              );
            })}
          </section>
          <section
            className={`${styles.navSection} ${styles.navSectionSearch}`}
          >
            <Search />
          </section>
          <UserNav user={user} />
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default RootLayout;
