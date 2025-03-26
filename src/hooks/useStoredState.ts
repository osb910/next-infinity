'use client';

import {
  useState,
  useReducer,
  useEffect,
  useLayoutEffect,
  type Dispatch,
  type SetStateAction,
  useCallback,
} from 'react';
import {
  useImmer,
  useImmerReducer,
  type Updater,
  type DraftFunction,
} from 'use-immer';
import Cookies from 'js-cookie';

export enum Storage {
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

export type ReducerStorageOptions<T, A> = StorageOptions & {
  initialDispatch: (value: T) => A;
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

export type RemoveStoredValue = (key: string, storage: Storage) => void;

export type ReturnObject = {
  isLoading: boolean;
  remove: () => void;
};

// export type UseStoredState = <T>(
//   initialValue: T | (() => T),
//   {key, storage, cookieOptions}: StorageOptions
// ) => [T | undefined, Dispatch<SetStateAction<T | undefined>>, ReturnObject];

// export type UseStoredImmer = <T>(
//   initialValue: T | (() => T),
//   {key, storage, cookieOptions}: StorageOptions
// ) => [T | undefined, Updater<T | undefined>, ReturnObject];

export type UseStoredReducer = <T, A>(
  reducer: (state: T, action: A) => T,
  initialValue: T,
  options: ReducerStorageOptions<T, A>
) => [T, Dispatch<A>, {isLoading: boolean}];

export type UseStoredImmerReducer = <T, A>(
  reducer: (state: DraftFunction<T>, action: A) => void | T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValue: any,
  options: ReducerStorageOptions<T, A>
) => [T, Dispatch<A>, {isLoading: boolean}];

export const getStoredValue: GetStoredValue = ({
  key,
  initialValue,
  storage,
}) => {
  const getInitialValue = () =>
    initialValue instanceof Function ? initialValue() : initialValue;

  const jsonValue =
    storage === Storage.Local
      ? window.localStorage.getItem(key)
      : storage === Storage.Session
      ? window.sessionStorage.getItem(key)
      : Cookies.get(key);
  if (!jsonValue) return getInitialValue();
  //  if (jsonValue != null) return JSON.parse(jsonValue); // alternative
  try {
    const parsedValue = JSON.parse(jsonValue);
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

const removeStoredValue: RemoveStoredValue = (key, storage) => {
  const storageMethods = {
    local: () => window.localStorage.removeItem(key),
    session: () => window.sessionStorage.removeItem(key),
    cookie: () => Cookies.remove(key),
  };

  storageMethods[storage]();
};

export const useStoredState = <T>(
  initialValue: T | (() => T),
  {key, storage = Storage.Local, cookieOptions}: StorageOptions
): [
  T | undefined,
  Dispatch<SetStateAction<T | undefined>>,
  {
    isLoading: boolean;
    remove: () => void;
  }
] => {
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState<T | undefined>(initialValue);

  useLayoutEffect(() => {
    setState(getStoredValue({key, initialValue, storage}));
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, storage]);

  useEffect(() => {
    if (state === undefined) return removeStoredValue(key, storage);
    setStoredValue({key, value: state, storage, cookieOptions});
  }, [state, key, storage, cookieOptions]);

  const remove = useCallback(() => {
    setState(undefined);
  }, []);

  return [state, setState, {isLoading, remove}];
};

export const useStoredImmer = <T>(
  initialValue: T | (() => T),
  {key, storage = Storage.Local, cookieOptions}: StorageOptions
): [T | undefined, Updater<T | undefined>, ReturnObject] => {
  const [isLoading, setIsLoading] = useImmer(true);
  const [state, setState] = useImmer<T | undefined>(initialValue);

  useLayoutEffect(() => {
    setState(getStoredValue({key, initialValue, storage}));
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, storage]);

  useEffect(() => {
    if (state === undefined) return removeStoredValue(key, storage);
    setStoredValue({key, value: state, storage, cookieOptions});
  }, [state, key, storage, cookieOptions]);

  const remove = useCallback(() => {
    setState(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [state, setState, {isLoading, remove}];
};

export const useStoredReducer: UseStoredReducer = (
  reducer,
  initialValue,
  {key, initialDispatch, storage = Storage.Local, cookieOptions}
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialValue);

  useLayoutEffect(() => {
    const storedValue = getStoredValue({key, initialValue, storage});
    if (storedValue !== null) {
      dispatch(initialDispatch(storedValue));
    }
    setIsLoading(false);
  }, [initialDispatch, initialValue, key, storage]);

  useEffect(() => {
    if (state === undefined) return removeStoredValue(key, storage);
    setStoredValue({key, value: state, storage, cookieOptions});
  }, [state, key, storage, cookieOptions]);

  return [state, dispatch, {isLoading}];
};

export const useStoredImmerReducer: UseStoredImmerReducer = (
  reducer,
  initialValue,
  {key, initialDispatch, storage = Storage.Local, cookieOptions}
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [immerState, immerDispatch] = useImmerReducer(reducer, initialValue);

  useEffect(() => {
    const storedValue = getStoredValue({key, initialValue, storage});
    if (storedValue !== null) {
      immerDispatch(initialDispatch(storedValue));
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue, initialDispatch, key, storage]);

  useEffect(() => {
    if (immerState === undefined) return removeStoredValue(key, storage);
    setStoredValue({key, value: immerState, storage, cookieOptions});
  }, [immerState, key, storage, cookieOptions]);

  return [immerState, immerDispatch, {isLoading}];
};
