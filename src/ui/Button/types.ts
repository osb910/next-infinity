import type {ReactNode, ComponentPropsWithoutRef, ReactElement} from 'react';
import type {LinkProps} from 'next/link';
import type {IconProps} from '@/ui/Icon/lucide';
// import {type IconType} from 'react-icons';

type CSSVars =
  | '--radius'
  | '--fs'
  | '--padding-y'
  | '--padding-x'
  | '--primary'
  | '--primary-light'
  | '--light'
  | '--off-light'
  | '--dark'
  | '--gray'
  | '--gray-25'
  | '--gray-75'
  | `--${string}`;

export type CustomProps = {[K in CSSVars]: string};

export type IconOptions =
  | {
      iconSource?: 'lucide';
      icon?: IconProps['name'];
      Icon?: never;
    }
  | {
      iconSource?: 'iconify';
      icon?: `${string}:${string}`;
      Icon?: never;
    }
  | {
      iconSource?: 'react-icons';
      Icon?: ReactElement;
      icon?: never;
    };

export type BaseProps = {
  children: ReactNode;
  variant?: 'fill' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  iconProps?: ComponentPropsWithoutRef<'span'>;
  iconLast?: boolean;
} & IconOptions;

export type ButtonProps = BaseProps &
  Omit<ComponentPropsWithoutRef<'button'>, 'style'> & {
    href?: never;
    style?: ComponentPropsWithoutRef<'button'>['style'] & CustomProps;
  };

export type AnchorProps = BaseProps &
  Omit<ComponentPropsWithoutRef<'a'>, 'style'> &
  LinkProps & {
    href?: string;
    style?: ComponentPropsWithoutRef<'a'>['style'] & CustomProps;
  };
