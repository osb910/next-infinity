import clsx from 'clsx';
import {type ComponentPropsWithoutRef, type ReactNode} from 'react';
import cls from './IconLabel.module.css';

interface IconLabelProps extends ComponentPropsWithoutRef<'figure'> {
  children: ReactNode;
  label: string;
}

const IconLabel = ({children, label, ...rest}: IconLabelProps) => {
  return (
    <figure className={clsx(cls.wrapper, rest.className)}>
      {children}
      <span>{label}</span>
    </figure>
  );
};

export default IconLabel;
