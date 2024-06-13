import {cookies} from 'next/headers';
import {getLocale, localize} from '@/l10n/next-blog/getL10n';
import {env} from '@/lib/helpers';
import {UserDataProvider} from '@/hooks/useUserData';
import Header from '@/components/next-blog/Header';
import Footer from '@/components/next-blog/Footer';
import {ThemeProvider} from '@/ui/ThemeSwitch/useTheme';
import type {GetMetadata, Layout} from '@/types';
import cls from './HomePage.module.css';
import './styles.css';

export const generateMetadata: GetMetadata<Layout> = async () => {
  const locale = getLocale();
  console.log({locale});
  const {l6e} = await localize({locale});
  const title = l6e('site.title');
  const titleTemp = `%s • ${title}`;
  return {
    title: {
      template: titleTemp,
      default: title,
    },
    description: l6e('site.description'),
    metadataBase: new URL(
      env('DOMAIN') ?? 'https://next-infinity.vercel.app/next-blog'
    ),
    openGraph: {
      title: {
        template: titleTemp,
        default: title,
      },
      description: l6e('site.description'),
      url: env('DOMAIN') ?? 'https://next-infinity.vercel.app/next-blog',
      siteName: title,
      alternates: {
        canonical: '/next-blog',
        languages: {
          'en-US': '/next-blog',
          'ar-EG': '/next-blog?locale=ar',
        },
      },
      locale: `${locale}_${locale === 'ar' ? 'EG' : 'US'}`,
      images: '/opengraph-image.png',
      type: 'website',
    },
    twitter: {
      title: {
        template: titleTemp,
        default: title,
      },
      description: l6e('site.description'),
      images: [
        `${
          `${env('DOMAIN')}/next-blog` ??
          'https://next-infinity.vercel.app/next-blog'
        }/opengraph-image.png`,
      ],
    },
  };
};

const RootLayout: Layout = async ({children}) => {
  const cookieStore = cookies();
  const locale = getLocale();
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
        <Header
          locale={locale}
          theme={theme}
          userId={userId}
        />
        <main className={cls.main}>{children}</main>
        <Footer locale={locale} />
      </UserDataProvider>
    </ThemeProvider>
  );
};

export default RootLayout;
