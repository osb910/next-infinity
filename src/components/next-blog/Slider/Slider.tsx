import React, {ComponentPropsWithoutRef} from 'react';
import clsx from 'clsx';

import styles from './Slider.module.css';

export interface SliderProps extends ComponentPropsWithoutRef<'input'> {}

function Slider({...delegated}: SliderProps) {
  return (
    <input
      type='range'
      {...delegated}
      className={clsx(styles.slider, delegated.className)}
    />
  );
}

export default Slider;
