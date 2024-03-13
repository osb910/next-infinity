'use client';

import {type MouseEvent, type ReactNode} from 'react';
import {Sun, Moon, type Icon} from 'react-feather';
import IconButton, {type IconButtonProps} from '@/ui/IconButton';
import VisuallyHidden from '@/ui/VisuallyHidden';
import {useTheme} from './useTheme';
import cls from './ThemeSwitch.module.css';

type Theme = 'light' | 'dark';
export interface ThemeSwitchProps extends Partial<IconButtonProps> {
  lightIcon?: Icon;
  darkIcon?: Icon;
  children?: ReactNode;
}

export const ThemeSwitch = ({
  lightIcon: Light = Sun,
  darkIcon: Dark = Moon,
  children,
  ...rest
}: ThemeSwitchProps) => {
  const {theme, toggleTheme} = useTheme();
  const Icon = theme === 'light' ? Light : Dark;

  return (
    <IconButton
      {...rest}
      className={`${cls.switch} ${rest.className ?? ''}`}
      icon={<Icon size='1.25em' />}
      onClick={(evt: MouseEvent<HTMLButtonElement>) => {
        toggleTheme();
        rest.onClick?.(evt);
      }}
    >
      <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
      {children}
    </IconButton>
  );
};

export default ThemeSwitch;
