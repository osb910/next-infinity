import Link from 'next/link';
import Image from 'next/image';
import {headers} from 'next/headers';
import {type ReactNode, type ComponentType} from 'react';
import {BiStore} from 'react-icons/bi';
import {BsTags, BsTrophy} from 'react-icons/bs';
import {MdOutlineAddBox} from 'react-icons/md';
import {PiMapPinLine} from 'react-icons/pi';
import NavLink from '../../components/next-stores/NavLink';
import Search from '../../components/next-stores/Search';
import {getURL} from '@/utils/path';
import UserNav from '@/components/next-stores/UserNav';
import {UserProvider} from '@/components/next-stores/useUser';
import {type Metadata} from 'next';
import {type IUser} from '@/services/next-stores/user';
import styles from './HomePage.module.css';
import Logo from '@/components/next-stores/Logo';
import {NavList} from '@/ui/Nav';

export const metadata: Metadata = {
  title: {
    template: '%s | Next Stores',
    default: 'Next Stores',
  },
  description: 'Your Delicious Dining Places',
  openGraph: {
    title: {
      template: '%s | Next Stores',
      default: 'Next Stores',
    },
    siteName: 'Next Stores',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/public/img/next-stores-logo.png',
        width: 800,
        height: 600,
      },
    ],
  },
  twitter: {
    title: {
      template: '%s | Next Stores',
      default: 'Next Stores',
    },
  },
};

export const dynamic = 'force-dynamic';

type User = IUser & {gravatar?: string};
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

const RootLayout = async ({children}: {children: ReactNode}) => {
  try {
    const headersStore = headers();
    const userId = headersStore.get('X-USER-ID');
    let user: any | User;
    if (!user) {
      const res = await fetch(getURL(`/api/next-stores/auth/me`), {
        headers: {
          'X-USER-ID': userId ?? '',
        },
        cache: 'no-store',
      });
      const json = await res.json();
      if (json.status === 'success') user = json.data;
    }
    const navLinks = menu
      .filter(({title}) => !(title === 'Add' && !user))
      .map(item => {
        return {
          href: item.slug,
          label: (
            <>
              <item.icon />
              <span>{item.title}</span>
            </>
          ),
        };
      });
    navLinks.unshift({href: '/next-stores', label: <Logo width='10rem' />});
    return (
      <UserProvider
        userEndpoint='/api/next-stores/auth/me'
        userIdCookie='next-stores-user-id'
      >
        <header className={styles.top}>
          <nav className={styles.nav}>
            <NavList
              items={navLinks}
              navItemClass={styles.navItem}
              highlightClass={styles.navLinkActive}
              highlightStyle={{
                borderBlockEndColor: 'rgba(20, 20, 60, 0.4)',
                borderInlineEndColor: 'rgba(0, 0, 0, 0.15)',
                background: `linear-gradient(
                  90deg,
                  hsla(50, 82%, 78%, 0.8) 0% 8%,
                  hsla(32, 68%, 45%, 0.8) 35% 65%,
                  hsla(50, 82%, 78%, 0.8) 92% 100%
                )`,
              }}
              linkClass={styles.navLink}
            />
            <section
              className={`${styles.navSection} ${styles.navSectionSearch}`}
            >
              <Search />
            </section>
            <UserNav
              user={user}
              logoutEndpoint='/api/next-stores/auth/logout'
            />
          </nav>
        </header>
        <main className={styles.main}>{children}</main>
      </UserProvider>
    );
  } catch (err) {
    console.error(err);
  }
};

export default RootLayout;
