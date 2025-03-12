import clsx from 'clsx';
import type {ComponentProps, ReactNode} from 'react';
import type {CSSProps} from '@/types';
import cls from './Grained.module.css';

interface GrainedProps extends ComponentProps<'div'> {
  bg: `url(${string})`;
  children?: ReactNode;
  opacity?: number;
}

const Grained = ({bg, children, opacity, ...rest}: GrainedProps) => {
  const style: CSSProps = {
    '--bg-grain': bg,
    ...(opacity && {'--opacity': opacity}),
  };
  return (
    <div
      className={clsx(cls.grained)}
      style={{...style, ...rest.style}}
    >
      {children}
    </div>
  );
};

export default Grained;
