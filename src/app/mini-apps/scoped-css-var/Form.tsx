'use client';
import {useStoredState} from '@/hooks/useStoredState';
import styles from './ScopedCSSVar.module.css';
import {useEffect, useCallback, ChangeEvent} from 'react';

type Vars = {
  spacing: number;
  blur: number;
  base: string;
};

const Form = () => {
  const [vars, setVars, loading] = useStoredState<Vars>(
    {
      spacing: 10,
      blur: 10,
      base: '#ffc600',
    },
    {key: 'scopedCSSVar'}
  );

  const updateVar = useCallback(
    (varName: string, varValue: string | number, suffix?: string) => {
      document.documentElement.style.setProperty(
        `--scoped-${varName}`,
        `${varValue}${suffix ?? ''}`
      );
    },
    []
  );

  useEffect(() => {
    if (loading) return;
    if (!vars) return;
    Object.entries(vars).forEach(([varName, varValue]: [string, any]) => {
      updateVar(varName, varValue, /^\d+$/.test(varValue) ? 'px' : '');
    });
  }, [vars, loading, updateVar]);

  const changeVar = (evt: ChangeEvent<HTMLInputElement>) => {
    const varName = evt.target.name;
    const newVar = evt.target.value;
    const suffix = evt.target.dataset?.suffix ?? '';

    setVars((current) => {
      if (!current) return;
      return {
        ...current,
        [varName]: newVar,
      };
    });

    updateVar(varName, newVar, suffix);
  };
  return (
    <form className={styles.controls}>
      <p className={styles.control}>
        <label htmlFor='spacing'>Spacing:</label>
        <input
          className={styles.input}
          id='spacing'
          type='range'
          name='spacing'
          min='4'
          max='160'
          value={vars?.spacing}
          onInput={changeVar}
          data-suffix='px'
        />
      </p>
      <p className={styles.control}>
        <label htmlFor='blur'>Blur:</label>
        <input
          className={styles.input}
          id='blur'
          type='range'
          name='blur'
          min='0'
          max='25'
          value={vars?.blur}
          onInput={changeVar}
          data-suffix='px'
        />
      </p>
      <p className={styles.control}>
        <label htmlFor='base'>Base Color</label>
        <input
          className={styles.input}
          id='base'
          type='color'
          name='base'
          value={vars?.base}
          onInput={changeVar}
        />
      </p>
    </form>
  );
};

export default Form;
