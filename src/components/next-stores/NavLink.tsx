'use client';

import {ReactNode} from 'react';
import Link, {LinkProps} from 'next/link';
import {usePathname} from 'next/navigation';

interface NavLinkProps extends LinkProps {
  activeClassName: string;
  children: ReactNode;
  className?: string;
}

const NavLink = ({
  children,
  activeClassName,
  className,
  ...rest
}: NavLinkProps) => {
  const {href} = rest;
  const pathName = usePathname();

  const isActive = pathName === href;
  return (
    <Link
      {...rest}
      className={`${isActive ? activeClassName : ''} ${className ?? ''}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
