'use client';

import {useState, useCallback, SetStateAction} from 'react';

export type ValidationFunction<T> = (value: T) => boolean;

const useStateWithValidation = <T>(
  validationFunc: ValidationFunction<T>,
  initialValue: T | (() => T)
): [T, (nextState: SetStateAction<T>) => void, boolean] => {
  const [state, setState] = useState<T>(initialValue);
  const [isValid, setIsValid] = useState<boolean>(() =>
    validationFunc(
      typeof initialValue === 'function'
        ? (initialValue as () => T)()
        : initialValue
    )
  );

  const onChange = useCallback(
    (nextState: SetStateAction<T>) => {
      const value =
        typeof nextState === 'function'
          ? (nextState as (prevState: T) => T)(state)
          : nextState;
      setState(value);
      setIsValid(validationFunc(value));
    },
    [validationFunc, state]
  );

  return [state, onChange, isValid];
};

export default useStateWithValidation;
