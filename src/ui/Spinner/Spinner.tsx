import {memo, type ComponentPropsWithoutRef} from 'react';
import {Loader} from 'react-feather';
import VisuallyHidden from '@/ui/VisuallyHidden';
import styles from './Spinner.module.css';

export interface SpinnerProps extends ComponentPropsWithoutRef<'span'> {
  color?: string;
  size?: number;
  opacity?: number;
  speed?: number;
  loadingText?: string;
}

export const Spinner = ({
  loadingText = 'Loading…',
  color = 'black',
  size = 24,
  opacity = 0.5,
  speed = 1200,
  ...rest
}: SpinnerProps) => {
  const style = {
    opacity,
    '--speed': `${speed}ms`,
    width: size,
    height: size,
    color,
  };
  return (
    <span
      {...rest}
      style={{...style, ...rest.style}}
      className={`${styles.wrapper} ${rest?.className ?? ''}`}
    >
      <Loader
        size={size}
        color={color}
      />
      <VisuallyHidden>{loadingText}</VisuallyHidden>
    </span>
  );
};

export default memo(Spinner);
