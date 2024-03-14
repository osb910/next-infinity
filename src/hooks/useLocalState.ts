'use client';

import {
  useState,
  useReducer,
  useEffect,
  type Dispatch,
  type SetStateAction,
  useLayoutEffect,
} from 'react';
import {useImmer, useImmerReducer} from 'use-immer';

export type LocalStateConfig = {
  key: string;
  immer?: boolean;
};

export type LocalReducerConfig = {
  key: string;
  initialDispatch: (value: any) => any;
};

const getStoredValue = (key: string, initialValue: any) => {
  const storedValue = window.localStorage.getItem(key);
  if (storedValue !== null) {
    try {
      const value = JSON.parse(storedValue);
      return value;
    } catch (err) {
      if (!(err instanceof Error)) return;
      console.warn(`${err.message}. Using the original stored value instead.`);
      return storedValue;
    }
  } else {
    if (initialValue instanceof Function) return initialValue();
    return initialValue;
  }
};

const useLocalState = <T>(
  initialState: any,
  {key, immer = false}: LocalStateConfig
): [any, Dispatch<SetStateAction<T>>, boolean] => {
  const hook = immer ? useImmer : useState;
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = hook(initialState);

  useLayoutEffect(() => {
    setState(getStoredValue(key, initialState));
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      key,
      typeof state === 'string' ? state : JSON.stringify(state)
    );
  }, [state, key]);

  return [state, setState, isLoading];
};

export const useLocalReducer = <T, A>(
  reducer: (state: T, action: A) => void,
  initialState: any,
  {key, initialDispatch}: LocalReducerConfig
): [any, Dispatch<A>, boolean] => {
  const [loading, setIsLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialState);

  useLayoutEffect(() => {
    const storedValue = window.localStorage.getItem(key);
    if (storedValue !== null) {
      dispatch(initialDispatch(storedValue));
    }
    setIsLoading(false);
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
  const [loading, setIsLoading] = useState(true);
  const [immerState, immerDispatch] = useImmerReducer(reducer, initialState);

  useEffect(() => {
    const storedValue = window.localStorage.getItem(key);
    if (storedValue !== null) {
      immerDispatch(initialDispatch(storedValue));
    }
    setIsLoading(false);
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
