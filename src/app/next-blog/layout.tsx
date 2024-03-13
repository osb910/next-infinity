import {cookies} from 'next/headers';
import {UserDataProvider} from '@/hooks/useUserData';
import {ThemeProvider} from '@/ui/ThemeSwitch/useTheme';
import {NavProvider} from '@/ui/Nav';
import {type Metadata} from 'next';
import Header from '@/components/next-blog/Header';
import Footer from '@/components/next-blog/Footer';
import cls from './HomePage.module.css';

export const metadata: Metadata = {
  title: {
    template: '%s • Next Blog',
    default: 'Next Blog',
  },
  description: 'Read about different topics',
  openGraph: {
    title: {
      template: '%s • Next Blog',
      default: 'Next Blog',
    },
    siteName: 'Next Blog',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: {
      template: '%s • Next Blog',
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

  return (
    <ThemeProvider initialTheme={theme}>
      <UserDataProvider
        userEndpoint='/api/next-blog/auth/me'
        userIdCookie='next-blog-user-id'
      >
        <NavProvider>
          <Header theme={theme} userId={userId} />
        </NavProvider>
        <main className={cls.main}>{children}</main>
        <Footer />
      </UserDataProvider>
    </ThemeProvider>
  );
};

export default RootLayout;
