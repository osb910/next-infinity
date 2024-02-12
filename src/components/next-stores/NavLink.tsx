'use client';

import Link, {type LinkProps} from 'next/link';
import {usePathname} from 'next/navigation';
import {type ComponentPropsWithoutRef, type ReactNode} from 'react';

type NavLinkProps = LinkProps &
  ComponentPropsWithoutRef<'a'> & {
    activeClass: string;
    children: ReactNode;
  };

const NavLink = ({children, activeClass, ...delegated}: NavLinkProps) => {
  const pathName = usePathname();

  const isActive = pathName === delegated.href;

  return (
    <Link
      {...delegated}
      className={`${isActive ? activeClass : ''} ${delegated.className ?? ''}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
