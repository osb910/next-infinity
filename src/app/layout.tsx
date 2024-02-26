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
import {ToastProvider} from '@/ui/Toaster';

import ObeyMotionPref from '@/ui/ObeyMotionPref';
import Toaster from '@/ui/Toaster/Toaster';
import {type Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Next Infinity',
  description:
    'Full-stack projects and mini-apps built with Next.js, TypeScript, and MongoDB',
  metadataBase: new URL('https://next-infinity.vercel.app'),
  openGraph: {
    title: 'Next Infinity',
    url: 'https://next-infinity.vercel.app',
    siteName: 'Next Infinity',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'Next Infinity',
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
  const headerStore = headers();
  const cookieStore = cookies();
  const site = headerStore.get('x-site');
  const theme = cookieStore.get('color-theme')?.value ?? 'light';

  return (
    <html
      lang='en'
      data-color-theme={theme}
      className={clsx(
        site,
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
      <body suppressHydrationWarning>
        <ObeyMotionPref>
          <SoundProvider>
            <ToastProvider>
              {children}
              <Toaster lang='en' />
            </ToastProvider>
          </SoundProvider>
        </ObeyMotionPref>
      </body>
    </html>
  );
}
