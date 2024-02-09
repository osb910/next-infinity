import {Nunito_Sans} from 'next/font/google';

import {type ReactNode} from 'react';
import './styles.css';

const primaryFont = Nunito_Sans({
  weight: ['500', '700'],
  subsets: ['latin'],
});

function VaporLayout({children}: {children: ReactNode}) {
  const style: {[x: string]: string} = {
    '--fn-primary': primaryFont.style.fontFamily,
  };
  return (
    <div className='vapor' style={style}>
      <header>
        <div className='header-content max-width-wrapper'>
          <a href='#' className='logo'>
            Vapor
          </a>
          <nav>
            <ul>
              <li>
                <a className='active' href='#'>
                  Library
                </a>
              </li>
              <li>
                <a href='#'>Store</a>
              </li>
              <li>
                <a href='#'>Community</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer>Copyright © 2003-present Vapor Inc. All Rights Reserved.</footer>
    </div>
  );
}

export default VaporLayout;
