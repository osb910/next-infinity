'use client';

import {useState, type MouseEvent, type ReactNode} from 'react';
import Cookies from 'js-cookie';
import {Sun, Moon, Icon} from 'react-feather';
import IconButton, {type IconButtonProps} from '@/ui/IconButton';
import styles from './ThemeSwitch.module.css';
import VisuallyHidden from '@/ui/VisuallyHidden';

// type IconButtonProps = Parameters<typeof IconButton>;

type Theme = 'light' | 'dark';
export interface ThemeSwitchProps extends Partial<IconButtonProps> {
  initialTheme?: Theme;
  lightIcon?: Icon;
  darkIcon?: Icon;
  cookieName?: string;
  cookieOptions?: Cookies.CookieAttributes;
  children?: ReactNode;
}

export const ThemeSwitch = ({
  initialTheme = 'light',
  lightIcon: Light = Sun,
  darkIcon: Dark = Moon,
  cookieName = 'color-theme',
  cookieOptions,
  children,
  ...delegated
}: ThemeSwitchProps) => {
  const [theme, setTheme] = useState(initialTheme);
  const Icon = theme === 'light' ? Light : Dark;

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
      icon={<Icon size='1.25em' />}
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
