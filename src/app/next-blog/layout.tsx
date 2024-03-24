import {cookies, headers} from 'next/headers';
import {UserDataProvider} from '@/hooks/useUserData';
import {ThemeProvider} from '@/ui/ThemeSwitch/useTheme';
import {type Metadata} from 'next';
import Header from '@/components/next-blog/Header';
import Footer from '@/components/next-blog/Footer';
import siteInfo from '@/l10n/next-blog/site';
import cls from './HomePage.module.css';
import './styles.css';

export const metadata: Metadata = {
  title: {
    template: `%s • ${siteInfo['en'].siteName}`,
    default: siteInfo['en'].siteName,
  },
  description: siteInfo['en'].description,
  openGraph: {
    title: {
      template: `%s • ${siteInfo['en'].siteName}`,
      default: siteInfo['en'].siteName,
    },
    siteName: siteInfo['en'].siteName,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: {
      template: `%s • ${siteInfo['en'].siteName}`,
      default: siteInfo['en'].siteName,
    },
  },
};

const RootLayout = async ({children}: {children: React.ReactNode}) => {
  const headerStore = headers();
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
        <Header theme={theme} userId={userId} />
        <main className={cls.main}>{children}</main>
        <Footer />
      </UserDataProvider>
    </ThemeProvider>
  );
};

export default RootLayout;
