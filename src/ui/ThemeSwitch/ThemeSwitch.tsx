'use client';

import {useState, type MouseEvent, type ReactNode} from 'react';
import Cookies from 'js-cookie';
import {Sun, Moon} from 'react-feather';
import IconButton, {type IconButtonProps} from '@/ui/IconButton';
import styles from './ThemeSwitch.module.css';
import VisuallyHidden from '@/ui/VisuallyHidden';

// type IconButtonProps = Parameters<typeof IconButton>;

interface ThemeSwitchProps extends Partial<IconButtonProps> {
  initialTheme: 'light' | 'dark';
  lightIcon?: JSX.Element;
  darkIcon?: JSX.Element;
  cookieName?: string;
  cookieOptions?: Cookies.CookieAttributes;
  children?: ReactNode;
}

const ThemeSwitch = ({
  initialTheme,
  lightIcon = <Sun size='1.25em' />,
  darkIcon = <Moon size='1.25em' />,
  cookieName = 'color-theme',
  cookieOptions,
  children,
  ...delegated
}: ThemeSwitchProps) => {
  const [theme, setTheme] = useState(initialTheme);

  const toggle = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    Cookies.set(cookieName, nextTheme, {
      expires: 1000,
      ...cookieOptions,
    });

    const root = document.documentElement;

    root.setAttribute(`data-${cookieName}`, nextTheme);

    root.classList.toggle('dark');
  };

  return (
    <IconButton
      {...delegated}
      className={`${styles.switch} ${delegated.className ?? ''}`}
      icon={theme === 'light' ? lightIcon : darkIcon}
      onClick={(evt: MouseEvent<HTMLButtonElement>) => {
        toggle();
        delegated.onClick?.(evt);
      }}
    >
      <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
      {children}
    </IconButton>
  );
};

export default ThemeSwitch;
