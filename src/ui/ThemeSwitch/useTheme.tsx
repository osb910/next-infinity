'use client';

import {createContext, useContext, useState, type ReactNode} from 'react';
import Cookies from 'js-cookie';

export interface ThemeContextProps {
  theme: 'light' | 'dark';
  toggleTheme: (newTheme?: 'light' | 'dark') => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light',
  toggleTheme: () => {},
});

export const ThemeProvider = ({
  children,
  initialTheme = 'light',
  name = 'color-theme',
  cookieOptions,
}: {
  children: ReactNode;
  initialTheme?: 'light' | 'dark';
  name?: string;
  cookieOptions?: Cookies.CookieAttributes;
}) => {
  const [theme, setTheme] = useState(initialTheme);

  const toggleTheme = (newTheme?: 'light' | 'dark') => {
    const nextTheme = newTheme ?? theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);

    const root = document.documentElement;

    root.setAttribute(`data-${name}`, nextTheme);

    root.classList.remove('dark');
    root.classList.remove('light');
    root.classList.add(nextTheme);

    Cookies.set(name, nextTheme, {
      expires: 1000,
      ...cookieOptions,
    });
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const data = useContext(ThemeContext);

  if (!data)
    throw new Error('Cannot consume Theme context without a ThemeProvider');

  return data;
};
