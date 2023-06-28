import Footer from '@/components/Footer';
import {Atkinson_Hyperlegible, Roboto_Mono} from 'next/font/google';

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

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
