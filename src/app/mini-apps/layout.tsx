import Footer from '@/components/Footer';

export const metadata = {
  title: 'Next.js 30',
  description: 'A collection of 30 mini-apps built with Next.js',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
