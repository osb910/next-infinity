import React, {ReactNode, Suspense} from 'react';
import {Kanit} from 'next/font/google';

import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import './styles.css';
import {getNavLinks} from '@/helpers/web-base-helpers';

const primaryFont = Kanit({
  weight: ['300', '500'],
  subsets: ['latin'],
});

const Header = async () => {
  const navLinks = await getNavLinks();
  return <SiteHeader navLinks={navLinks} />;
};

const Footer = async () => {
  const navLinks = await getNavLinks();
  return <SiteFooter navLinks={navLinks} />;
};

function WebBaseLayout({children}: {children: ReactNode}) {
  const style: {[x: string]: string} = {
    '--fn-primary': primaryFont.style.fontFamily,
  };
  return (
    <div className='web-base' style={style}>
      <Suspense>
        <Header />
      </Suspense>
      <main>{children}</main>
      <Suspense>
        <Footer />
      </Suspense>
    </div>
  );
}

export default WebBaseLayout;
