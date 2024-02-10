import {ComponentProps, memo} from 'react';
import {Loader} from 'react-feather';
import VisuallyHidden from '@/ui/VisuallyHidden';
import styles from './Spinner.module.css';
// import SpinnerWrapper from './StyledWrapper';

export interface SpinnerProps extends ComponentProps<'span'> {
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
  ...delegated
}: SpinnerProps) => {
  const style = {
    opacity,
    '--speed': `${speed}ms`,
    width: size,
    height: size,
  };
  return (
    <span
      {...delegated}
      style={{...style, ...delegated.style}}
      className={`${styles.wrapper} ${delegated?.className ?? ''}`}
    >
      <Loader size={size} color={color} />
      <VisuallyHidden>{loadingText}</VisuallyHidden>
    </span>
  );
};

export default memo(Spinner);
