'use client';

import {
  useState,
  useReducer,
  useEffect,
  useLayoutEffect,
  type Dispatch,
  type SetStateAction,
} from 'react';
import {
  useImmer,
  useImmerReducer,
  type Updater,
  type DraftFunction,
} from 'use-immer';

export type LocalStateConfig = {
  key: string;
};

export type GetStoredValue = <T>(key: string, initialValue: T | (() => T)) => T;

export type UseLocalState = <T>(
  initialState: T | (() => T),
  {key}: LocalStateConfig
) => [T, Dispatch<SetStateAction<T>>, boolean];

export type UseLocalImmer = <T>(
  initialState: T | (() => T),
  {key}: LocalStateConfig
) => [T, Updater<T>, boolean];

export type LocalReducerConfig<T> = {
  key: string;
  initialDispatch: (value: string) => T;
};

export const getStoredValue: GetStoredValue = (key, initialValue) => {
  const getInitialValue = () =>
    initialValue instanceof Function ? initialValue() : initialValue;

  const storedValue = window.localStorage.getItem(key);
  try {
    if (!storedValue) return getInitialValue();

    const parsedValue = JSON.parse(storedValue);
    return parsedValue;
  } catch (err) {
    console.warn(
      `Error reading from localStorage: ${
        (err as Error).message
      }. Using initial value.`
    );
    return getInitialValue();
  }
};

export const useLocalState: UseLocalState = (initialState, {key}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState(initialState);

  useLayoutEffect(() => {
    setState(getStoredValue(key, initialState));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      key,
      typeof state === 'string' ? state : JSON.stringify(state)
    );
  }, [state, key]);

  return [state, setState, isLoading];
};

export const useLocalImmer: UseLocalImmer = (
  initialState,
  {key}: LocalStateConfig
) => {
  const [isLoading, setIsLoading] = useImmer(true);
  const [state, setState] = useImmer(initialState);

  useLayoutEffect(() => {
    setState(getStoredValue(key, initialState));
    setIsLoading(false);
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
  reducer: (state: T, action: A) => T,
  initialState: any,
  {key, initialDispatch}: LocalReducerConfig<A>
): [any, Dispatch<A>, boolean] => {
  const [loading, setIsLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialState);

  useLayoutEffect(() => {
    const storedValue = window.localStorage.getItem(key);
    if (storedValue !== null) {
      dispatch(initialDispatch(storedValue));
    }
    setIsLoading(false);
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
  reducer: (state: DraftFunction<T>, action: A) => void | T,
  initialState: any,
  {key, initialDispatch}: LocalReducerConfig<A>
): [any, Dispatch<A>, boolean] => {
  const [loading, setIsLoading] = useState(true);
  const [immerState, immerDispatch] = useImmerReducer(reducer, initialState);

  useEffect(() => {
    const storedValue = window.localStorage.getItem(key);
    if (storedValue !== null) {
      immerDispatch(initialDispatch(storedValue));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      key,
      typeof immerState === 'string' ? immerState : JSON.stringify(immerState)
    );
  }, [immerState, key]);

  return [immerState, immerDispatch, loading];
};
