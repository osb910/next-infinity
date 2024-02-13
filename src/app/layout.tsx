import './globals.css';
import {
  Atkinson_Hyperlegible,
  Roboto_Mono,
  Lato,
  Redacted_Script,
  Fira_Code,
} from 'next/font/google';
import {SoundProvider} from '@/ui/SfxSwitch/sound-enabled';
import {ToastProvider} from '@/components/Toaster/use-toaster';
import Toaster from '@/components/Toaster/Toaster';
import {Metadata} from 'next';
import {cookies} from 'next/headers';
import ObeyMotionPref from '@/ui/ObeyMotionPref';
// import {createServerContext} from 'react';

// export const testServerContext = createServerContext(
//   'TestServerContext',
//   'test'
// );

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

const roboto = Roboto_Mono({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

const atkinson = Atkinson_Hyperlegible({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
});

const fira = Fira_Code({
  weight: ['400', '700'],
  subsets: ['latin'],
});

const loadingFont = Redacted_Script({
  weight: ['400'],
  subsets: ['latin'],
});

export default function RootLayout({children}: {children: React.ReactNode}) {
  const cookieStore = cookies();
  const theme = cookieStore.get('color-theme')?.value ?? 'light';

  const style: {[key: string]: string} = {
    '--fn-loading': loadingFont.style.fontFamily,
    '--fn-roboto': roboto.style.fontFamily,
    '--fn-atkinson': atkinson.style.fontFamily,
    '--fn-lato': lato.style.fontFamily,
    '--fn-fira': fira.style.fontFamily,
  };
  return (
    <ObeyMotionPref>
      <html lang='en' data-color-theme={theme} style={style} className={theme}>
        <body className={`${atkinson.className}`} suppressHydrationWarning>
          <SoundProvider>
            <ToastProvider>
              {children}
              <Toaster lang='en' />
            </ToastProvider>
          </SoundProvider>
        </body>
      </html>
    </ObeyMotionPref>
  );
}
