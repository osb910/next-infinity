import './globals.css';
import {
  Atkinson_Hyperlegible,
  Roboto_Mono,
  Lato,
  Work_Sans,
  Redacted_Script,
  Fira_Code,
  Spline_Sans_Mono,
} from 'next/font/google';
import {headers, cookies} from 'next/headers';
import clsx from 'clsx';
import {SoundProvider} from '@/ui/SfxSwitch/sound-enabled';
import Toaster, {ToastProvider} from '@/ui/Toaster';
import ObeyMotionPref from '@/ui/ObeyMotionPref';
import {TooltipProvider} from '@/ui/Tooltip';
import {type Metadata} from 'next';
import {getLocale} from '@/l10n/next-blog/getL10n';
import {languages} from '@/l10n/next-blog/config';
import {env} from '@/lib/helpers';

const title = 'Next Infinity';
const description =
  'An assortment of full-stack projects and miniature applications crafted using Next.js, TypeScript, MongoDB, and Framer Motion.';

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL('https://next-infinity.vercel.app'),
  openGraph: {
    title,
    description,
    url: 'https://next-infinity.vercel.app',
    siteName: title,
    locale: 'en_US',
    images: '/opengraph-image.png',
    type: 'website',
  },
  twitter: {
    title,
    description,
    images: [
      `${
        `${env('DOMAIN')}` ?? 'https://next-infinity.vercel.app'
      }/opengraph-image.png`,
    ],
  },
};

const atkinson = Atkinson_Hyperlegible({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--fn-atkinson',
});

const roboto = Roboto_Mono({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--fn-roboto',
});

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--fn-lato',
});

const fira = Fira_Code({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--fn-fira',
});

const loadingFont = Redacted_Script({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--fn-loading',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--fn-work-sans',
});

const splineSansMono = Spline_Sans_Mono({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--fn-spline-sans-mono',
});

export default function RootLayout({children}: {children: React.ReactNode}) {
  const locale = getLocale();
  const headerStore = headers();
  const site = headerStore.get('site');
  const cookieStore = cookies();
  const theme = (cookieStore.get('color-theme')?.value ?? 'light') as
    | 'light'
    | 'dark';

  const {dir: blogDir} = languages[locale];

  return (
    <html
      lang={site === 'next-blog' ? locale : 'en'}
      className={clsx(
        site === 'next-blog' && blogDir,
        theme,
        atkinson.variable,
        roboto.variable,
        lato.variable,
        loadingFont.variable,
        workSans.variable,
        fira.variable,
        splineSansMono.variable
      )}
    >
      <body
        dir={site === 'next-blog' ? blogDir : 'ltr'}
        suppressHydrationWarning
      >
        <ObeyMotionPref>
          <SoundProvider>
            <ToastProvider>
              <TooltipProvider>{children}</TooltipProvider>
              <Toaster lang={site === 'next-blog' ? locale : 'en'} />
            </ToastProvider>
          </SoundProvider>
        </ObeyMotionPref>
      </body>
    </html>
  );
}
