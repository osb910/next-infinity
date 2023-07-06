'use client';

import {useReducer, useCallback, ChangeEvent} from 'react';

export type State = {
  value: string;
  isTouched: boolean;
};

export type Action =
  | {
      type: 'INPUT';
      value: string;
    }
  | {
      type: 'BLUR';
    }
  | {
      type: 'RESET';
    };

const initialState: State = {
  value: '',
  isTouched: false,
};

const reducer = (state: State, action: Action): State => {
  if (action.type === 'INPUT')
    return {value: action.value, isTouched: state.isTouched};
  if (action.type === 'BLUR') return {isTouched: true, value: state.value};
  if (action.type === 'RESET') return initialState;
  return initialState;
};

const useInput = (validateValue: (value: any) => boolean) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const isValid = validateValue(state.value);
  const hasError = state.isTouched && !isValid;

  const onValueChange = useCallback((evt: ChangeEvent) => {
    dispatch({type: 'INPUT', value: (evt.target as HTMLInputElement).value});
  }, []);

  const onBlur = useCallback(() => {
    dispatch({type: 'BLUR'});
  }, []);

  const reset = useCallback(() => {
    dispatch({type: 'RESET'});
  }, []);

  return {
    value: state.value,
    isValid,
    hasError,
    onValueChange,
    onBlur,
    reset,
  };
};

export default useInput;
