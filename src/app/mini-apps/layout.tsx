import Footer from '@/components/Footer';
import type {ReactNode} from 'react';

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
