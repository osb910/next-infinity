'use client';
import Link from 'next/link';
import {type ReactNode, type MouseEventHandler} from 'react';
import {usePathname} from 'next/navigation';
import styles from './ButtonLink.module.css';

interface ButtonLinkProps {
  link?: string;
  onClick?: MouseEventHandler;
  children?: ReactNode;
  className?: string;
  [key: string]: any;
}

const ButtonLink = ({
  link,
  onClick,
  children,
  className = '',
  ...delegated
}: ButtonLinkProps) => {
  const href = `${link}`;
  const Component = link ? Link : 'button';
  return (
    <Component
      href={href}
      onClick={onClick}
      className={`${styles.btn} ${className}`}
      {...delegated}
    >
      {children}
    </Component>
  );
};

export default ButtonLink;
