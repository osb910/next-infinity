import './globals.css';
import {
  Atkinson_Hyperlegible,
  Roboto_Mono,
  Lato,
  Redacted_Script,
} from 'next/font/google';
import {SoundProvider} from '@/components/SoundToggler/sound-enabled';
import {ToastProvider} from '@/components/Toaster/use-toaster';
import Toaster from '@/components/Toaster/Toaster';

export const metadata = {
  title: 'Next.js 30',
  description: 'A collection of 30 mini-apps built with Next.js',
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

const loadingFont = Redacted_Script({
  weight: ['400'],
  subsets: ['latin'],
});

export default function RootLayout({children}: {children: React.ReactNode}) {
  const style: {[key: string]: string} = {
    '--font-family-loading': loadingFont.style.fontFamily,
  };
  return (
    <html lang='en' style={style}>
      <body
        className={`${roboto.className} ${atkinson.className} ${lato.className}`}
        suppressHydrationWarning
      >
        <SoundProvider>
          <ToastProvider>
            {children}
            <Toaster />
          </ToastProvider>
        </SoundProvider>
      </body>
    </html>
  );
}
