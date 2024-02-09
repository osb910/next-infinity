import {cookies} from 'next/headers';
import NavBar from '@/components/next-blog/NavBar';
import {UserDataProvider} from '@/hooks/useUserData';
import {type Metadata} from 'next';
import styles from './HomePage.module.css';
import ThemeSwitch from '@/ui/ThemeSwitch';
import SfxSwitch from '@/ui/SfxSwitch';
import Switch from '@/ui/Switch';

export const metadata: Metadata = {
  title: {
    template: '%s | Next Blog',
    default: 'Next Blog',
  },
  description: 'Read about different topics',
  openGraph: {
    title: {
      template: '%s | Next Blog',
      default: 'Next Blog',
    },
    siteName: 'Next Blog',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: {
      template: '%s | Next Blog',
      default: 'Next Blog',
    },
  },
};

const RootLayout = async ({children}: {children: React.ReactNode}) => {
  const cookieStore = cookies();
  const userId = cookieStore.get('next-blog-user-id')?.value ?? '';
  const theme = (cookieStore.get('color-theme')?.value ?? 'light') as
    | 'light'
    | 'dark';

  const btnAnimation = {
    backgroundColor: 'hsla(0, 0%, 50%, 0.3)',
    boxShadow: '0 0 0 4px hsla(0, 0%, 50%, 0.3)',
  };

  return (
    <UserDataProvider
      userEndpoint='/api/next-blog/auth/me'
      userIdCookie='next-blog-user-id'
    >
      <header className={styles.header}>
        <h1>Next Blog</h1>
        <NavBar />
        <section className={styles.settings}>
          <ThemeSwitch
            initialTheme={theme}
            whileHover={btnAnimation}
            whileFocus={btnAnimation}
          />
          <SfxSwitch whileHover={btnAnimation} whileFocus={btnAnimation} />
          <Switch />
        </section>
      </header>
      <main className={styles.main}>{children}</main>
    </UserDataProvider>
  );
};

export default RootLayout;
