import Header from '@/components/Header/Header';

export const metadata = {
  title: 'Next.js 30 (Analog Clock)',
  description: 'A collection of 30 mini-apps built with Next.js',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Header>
        <h1>Analog Clock</h1>
      </Header>
      {children}
    </>
  );
}
