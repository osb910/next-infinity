'use client';

import {useState, useCallback} from 'react';
import Cookies from 'js-cookie';

export type CookieValue = string | null;
export type UpdateCookieFunction = (
  newValue: CookieValue,
  options?: Cookies.CookieAttributes
) => void;
export type DeleteCookieFunction = () => void;

export type UseCookieReturn = [
  CookieValue,
  UpdateCookieFunction,
  DeleteCookieFunction
];

const useCookie = (
  name: string,
  defaultValue: string,
  options?: Cookies.CookieAttributes
): UseCookieReturn => {
  const [value, setValue] = useState<CookieValue>(() => {
    const cookie = Cookies.get(name);
    if (cookie) return cookie;
    Cookies.set(name, defaultValue, options);
    return defaultValue;
  });

  const updateCookie: UpdateCookieFunction = useCallback(
    (newValue, newOptions) => {
      if (newValue === null) {
        Cookies.remove(name);
      } else {
        Cookies.set(name, newValue, {
          ...options,
          ...newOptions,
        });
      }
      setValue(newValue);
    },
    [name, options]
  );

  const deleteCookie: DeleteCookieFunction = useCallback(() => {
    Cookies.remove(name);
    setValue(null);
  }, [name]);

  return [value, updateCookie, deleteCookie];
};

export default useCookie;
