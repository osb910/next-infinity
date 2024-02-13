import {headers} from 'next/headers';
import {getURL} from '@/utils/path';
import Header from '@/components/next-stores/Header';
import {UserProvider} from '@/components/next-stores/useUser';
import {type ReactNode} from 'react';
import {type Metadata} from 'next';
import {type IUser} from '@/services/next-stores/user';
import styles from './HomePage.module.css';

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

    return (
      <UserProvider
        userEndpoint='/api/next-stores/auth/me'
        userIdCookie='next-stores-user-id'
      >
        <Header user={user} />
        <main className={styles.main}>{children}</main>
      </UserProvider>
    );
  } catch (err) {
    console.error(err);
  }
};

export default RootLayout;
