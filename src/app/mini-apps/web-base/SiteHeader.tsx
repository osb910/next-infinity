import React from 'react';
import Link from 'next/link';

import {type NavLink} from '@/helpers/web-base-helpers';

async function SiteHeader({navLinks}: {navLinks: Array<NavLink>}) {
  return (
    <header className='site-header'>
      <Link href='' className='logo'>
        WebBase
      </Link>
      <nav>
        <ol className='header-nav-links'>
          {navLinks.slice(0, 4).map(({slug, label, href, type}) => (
            <li key={slug}>
              <Link href={href} className={`header-nav-link ${type}`}>
                {label}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </header>
  );
}

export default SiteHeader;
