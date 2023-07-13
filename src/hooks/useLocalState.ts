'use client';

import {useState, useReducer, useEffect, Dispatch, SetStateAction} from 'react';
import {useImmer, useImmerReducer} from 'use-immer';

export type LocalStateConfig = {
  key: string;
  immer?: boolean;
};

export type LocalReducerConfig = {
  key: string;
  initialDispatch: (value: any) => any;
};

const useLocalState = <T>(
  initialState: any,
  {key, immer = false}: LocalStateConfig
): [any, Dispatch<SetStateAction<T>>, boolean] => {
  const hook = immer ? useImmer : useState;
  const [loading, setLoading] = useState(true);
  const [state, setState] = hook(initialState);

  useEffect(() => {
    const storedValue = window.localStorage.getItem(key);
    if (storedValue !== null) {
      try {
        const value = JSON.parse(storedValue);
        setState(value);
      } catch (err) {
        if (!(err instanceof Error)) return;
        console.warn(
          `${err.message}. Using the original stored value instead.`
        );
        setState(storedValue);
      }
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      key,
      typeof state === 'string' ? state : JSON.stringify(state)
    );
  }, [state, key]);

  return [state, setState, loading];
};

export const useLocalReducer = <T, A>(
  reducer: (state: T, action: A) => void,
  initialState: any,
  {key, initialDispatch}: LocalReducerConfig
): [any, Dispatch<A>, boolean] => {
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const storedValue = window.localStorage.getItem(key);
    if (storedValue !== null) {
      dispatch(initialDispatch(storedValue));
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      key,
      typeof state === 'string' ? state : JSON.stringify(state)
    );
  }, [state, key]);

  return [state, dispatch, loading];
};

export const useLocalImmerReducer = <T, A>(
  reducer: (state: T, action: A) => void,
  initialState: any,
  {key, initialDispatch}: LocalReducerConfig
): [any, Dispatch<A>, boolean] => {
  const [loading, setLoading] = useState(true);
  const [immerState, immerDispatch] = useImmerReducer(reducer, initialState);

  useEffect(() => {
    const storedValue = window.localStorage.getItem(key);
    if (storedValue !== null) {
      immerDispatch(initialDispatch(storedValue));
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      key,
      typeof immerState === 'string' ? immerState : JSON.stringify(immerState)
    );
  }, [immerState, key]);

  return [immerState, immerDispatch, loading];
};

export default useLocalState;
