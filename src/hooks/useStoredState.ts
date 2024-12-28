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
import Cookies from 'js-cookie';

enum Storage {
  Local = 'local',
  Session = 'session',
  Cookie = 'cookie',
}

export type StorageOptions = {key: string} & (
  | {
      storage?: Storage.Local | Storage.Session;
      cookieOptions?: never;
    }
  | {
      storage?: Storage.Cookie;
      cookieOptions?: Cookies.CookieAttributes;
    }
);

export type ReducerStorageOptions<T> = StorageOptions & {
  initialDispatch: (value: string) => T;
};

export type GetStoredValue = <T>(options: {
  key: string;
  initialValue: T | (() => T);
  storage: Storage;
}) => T;
export type SetStoredValue = (options: {
  key: string;
  value: unknown;
  storage: Storage;
  cookieOptions?: Cookies.CookieAttributes;
}) => void;

export type UseStoredState = <T>(
  initialValue: T | (() => T),
  {key, storage}: StorageOptions
) => [T, Dispatch<SetStateAction<T>>, boolean];

export type UseStoredImmer = <T>(
  initialValue: T | (() => T),
  {key, storage}: StorageOptions
) => [T, Updater<T>, boolean];

export type UseStoredReducer = <T, A>(
  reducer: (state: T, action: A) => T,
  initialValue: any,
  options: ReducerStorageOptions<A>
) => [T, Dispatch<A>, boolean];

export type UseStoredImmerReducer = <T, A>(
  reducer: (state: DraftFunction<T>, action: A) => void | T,
  initialValue: any,
  options: ReducerStorageOptions<A>
) => [T, Dispatch<A>, boolean];

export const getStoredValue: GetStoredValue = ({
  key,
  initialValue,
  storage,
}) => {
  const getInitialValue = () =>
    initialValue instanceof Function ? initialValue() : initialValue;

  const storedValue =
    storage === Storage.Local
      ? window.localStorage.getItem(key)
      : storage === Storage.Session
      ? window.sessionStorage.getItem(key)
      : Cookies.get(key);
  if (!storedValue) return getInitialValue();
  try {
    const parsedValue = JSON.parse(storedValue);
    return parsedValue;
  } catch (err) {
    console.warn(
      `Error reading from ${storage} storage: ${
        (err as Error).message
      }. Using initial value.`
    );
    return getInitialValue();
  }
};

const setStoredValue: SetStoredValue = ({
  key,
  value,
  storage,
  cookieOptions,
}) => {
  const storageMethods = {
    local: () =>
      window.localStorage.setItem(
        key,
        typeof value === 'string' ? value : JSON.stringify(value)
      ),
    session: () =>
      window.sessionStorage.setItem(
        key,
        typeof value === 'string' ? value : JSON.stringify(value)
      ),
    cookie: () =>
      Cookies.set(
        key,
        typeof value === 'string' ? value : JSON.stringify(value),
        {
          expires: 1000,
          ...cookieOptions,
        }
      ),
  };

  storageMethods[storage]();
};

export const useStoredState: UseStoredState = (
  initialValue,
  {key, storage = Storage.Local, cookieOptions}
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState(initialValue);

  useLayoutEffect(() => {
    setState(getStoredValue({key, initialValue, storage}));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setStoredValue({key, value: state, storage, cookieOptions});
  }, [state, key]);

  return [state, setState, isLoading];
};

export const useStoredImmer: UseStoredImmer = (
  initialValue,
  {key, storage = Storage.Local, cookieOptions}
) => {
  const [isLoading, setIsLoading] = useImmer(true);
  const [state, setState] = useImmer(initialValue);

  useLayoutEffect(() => {
    setState(getStoredValue({key, initialValue, storage}));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setStoredValue({key, value: state, storage, cookieOptions});
  }, [state, key]);

  return [state, setState, isLoading];
};

export const useStoredReducer: UseStoredReducer = (
  reducer,
  initialValue,
  {key, initialDispatch, storage = Storage.Local, cookieOptions}
) => {
  const [loading, setIsLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialValue);

  useLayoutEffect(() => {
    const storedValue = getStoredValue({key, initialValue, storage});
    if (storedValue !== null) {
      dispatch(initialDispatch(storedValue));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setStoredValue({key, value: state, storage, cookieOptions});
  }, [state, key]);

  return [state, dispatch, loading];
};

export const useStoredImmerReducer: UseStoredImmerReducer = (
  reducer,
  initialValue,
  {key, initialDispatch, storage = Storage.Local, cookieOptions}
) => {
  const [loading, setIsLoading] = useState(true);
  const [immerState, immerDispatch] = useImmerReducer(reducer, initialValue);

  useEffect(() => {
    const storedValue = getStoredValue({key, initialValue, storage});
    if (storedValue !== null) {
      immerDispatch(initialDispatch(storedValue));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setStoredValue({key, value: immerState, storage, cookieOptions});
  }, [immerState, key]);

  return [immerState, immerDispatch, loading];
};
