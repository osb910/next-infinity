import clsx from 'clsx';
import Link from 'next/link';
import {type ReactElement} from 'react';
import LucideIcon, {type IconProps} from '@/ui/Icon/lucide';
import IconifyIcon from '@/ui/Icon/iconify';
import type {AnchorProps, ButtonProps} from './types';
import type {CSSProps} from '@/types';
import cls from './Button.module.css';

const SIZES = {
  small: {
    '--radius': '2px',
    '--fs': '1rem',
    '--padding-y': '0.325em',
    '--padding-x': '0.75em',
  },
  medium: {
    '--radius': '4px',
    '--fs': '1.125rem',
    '--padding-y': '0.6em',
    '--padding-x': '1em',
  },
  large: {
    '--radius': '6px',
    '--fs': '1.25rem',
    '--padding-y': '0.75em',
    '--padding-x': '1.25em',
  },
};

const isAnchorProps = (
  props: ButtonProps | AnchorProps
): props is AnchorProps => {
  return 'href' in props;
};

const Button = (props: ButtonProps | AnchorProps) => {
  const {
    children,
    variant = 'fill',
    size = 'medium',
    iconSource,
    icon,
    Icon,
    iconProps,
    iconLast,
    ...rest
  } = props;
  const styles: CSSProps = SIZES[size];
  const IconComponent =
    iconSource &&
    (iconSource === 'lucide' ? (
      <LucideIcon name={icon as IconProps['name']} />
    ) : iconSource === 'iconify' ? (
      <IconifyIcon icon={icon as `${string}:${string}`} />
    ) : (
      (Icon as ReactElement)
    ));

  const Children = () =>
    iconLast ? (
      <>
        {children}
        {IconComponent && <span {...iconProps}>{IconComponent}</span>}
      </>
    ) : (
      <>
        {IconComponent && <span {...iconProps}>{IconComponent}</span>}
        {children}
      </>
    );

  if (isAnchorProps(props)) {
    return (
      <Link
        {...props}
        className={clsx(cls.btn, cls[variant], rest.className)}
        style={{...styles, ...rest.style}}
      >
        <Children />
      </Link>
    );
  }

  return (
    <button
      {...props}
      className={clsx(cls.btn, cls[variant], rest.className)}
      style={{...styles, ...rest.style}}
    >
      <Children />
    </button>
  );
};

export default Button;
