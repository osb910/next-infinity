import {cookies} from 'next/headers';
import {getLocale} from '@/l10n/getL10n';
import {env} from '@/lib/helpers';
import {UserDataProvider} from '@/hooks/useUserData';
import Header from '@/components/next-blog/Header';
import Footer from '@/components/next-blog/Footer';
import {ThemeProvider} from '@/ui/ThemeSwitch/useTheme';
import type {GetLayoutMetadata, Layout} from '@/types';
import cls from './HomePage.module.css';
// import '../fonts.css';
import './styles.css';
import {localize} from '@/l10n';

type NextBlogLayout = GetLayoutMetadata;

export const generateMetadata: NextBlogLayout = async () => {
  const locale = await getLocale();
  const {l6e} = await localize(locale);
  const title = l6e('nextBlog.site.title');
  const description = l6e('nextBlog.site.description');
  const titleTemp = `%s • ${title}`;
  return {
    title: {
      template: titleTemp,
      default: title,
    },
    description,
    metadataBase: new URL(
      env('DOMAIN') ?? 'https://next-infinity.vercel.app/next-blog'
    ),
    openGraph: {
      title: {
        template: titleTemp,
        default: title,
      },
      description,
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
      description,
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
  const cookieStore = await cookies();
  const locale = await getLocale();
  // const userId = cookieStore.get('next-blog-user-id')?.value ?? '';
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
        />
        <main className={cls.main}>{children}</main>
        <Footer locale={locale} />
      </UserDataProvider>
    </ThemeProvider>
  );
};

export default RootLayout;
