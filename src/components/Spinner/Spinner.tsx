import {Loader} from 'react-feather';
import VisuallyHidden from '../VisuallyHidden';
import styles from './Spinner.module.css';
import {memo} from 'react';
// import SpinnerWrapper from './StyledWrapper';

interface SpinnerProps {
  color?: string;
  size?: number;
  opacity?: number;
  speed?: number;
  loadingText?: string;
}

const Spinner = ({
  loadingText = 'Loading…',
  color = 'black',
  size = 24,
  opacity = 0.5,
  speed = 1200,
}: SpinnerProps) => {
  const style = {
    opacity,
    '--speed': `${speed}ms`,
    width: size,
    height: size,
  };
  return (
    <span className={styles.wrapper} style={style}>
      <Loader size={size} color={color} />
      <VisuallyHidden>{loadingText}</VisuallyHidden>
    </span>
  );
};

export default memo(Spinner);
