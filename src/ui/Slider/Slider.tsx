import {useId, type ComponentPropsWithoutRef} from 'react';
import clsx from 'clsx';

import cls from './Slider.module.css';

export interface SliderProps extends ComponentPropsWithoutRef<'input'> {
  label?: string;
  value: number;
  ctrlClass?: string;
}

function Slider({label, value, ctrlClass, ...delegated}: SliderProps) {
  const id = `slider${
    delegated.name ? `-${delegated.name.toLowerCase()}` : ''
  }${useId()}`;

  return (
    <p className={clsx(cls.ctrl, ctrlClass)}>
      {label && (
        <label htmlFor={id} className={cls.label}>
          {label}
          <span className={cls.value}>{value}</span>
        </label>
      )}
      <input
        min={1}
        step={1}
        {...delegated}
        type='range'
        className={clsx(cls.slider, delegated.className)}
        id={id}
      />
    </p>
  );
}

export default Slider;
