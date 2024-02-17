import React from 'react';

import Slider, {type SliderProps} from '@/components/next-blog/Slider';
import styles from './SliderControl.module.css';

export interface SliderControlProps extends SliderProps {
  label: string;
  value: string | number;
}

function SliderControl({label, value, ...delegated}: SliderControlProps) {
  const id = React.useId();

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <span className={styles.value}>{value}</span>
      </div>
      <Slider {...delegated} value={value} id={id} />
    </div>
  );
}

export default SliderControl;
