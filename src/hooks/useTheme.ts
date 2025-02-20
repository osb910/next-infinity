'use client';

import {useCallback, useLayoutEffect} from 'react';
import {Storage, useStoredState} from './useStoredState';
import useMediaQuery from './useMediaQuery';

export type Theme = 'light' | 'dark';
export type ThemeMode = Theme | 'system';

interface ThemeState {
  theme: Theme;
  mode: ThemeMode;
  setTheme: (theme: Theme) => void;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  isLight: boolean;
  isDark: boolean;
  isSystem: boolean;
}

const useTheme = (defaultTheme: Theme = 'light'): ThemeState => {
  // Store the theme mode preference (light, dark, or system)
  const [mode, setMode] = useStoredState<ThemeMode>('system', {
    key: 'themeMode',
    storage: Storage.Cookie,
  });

  // Store the explicit theme choice when not using system preference
  const [theme, setTheme] = useStoredState<Theme>(defaultTheme, {
    key: 'theme',
    storage: Storage.Cookie,
  });
  // Get system preference
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  // Determine the active theme based on mode
  const activeTheme =
    mode === 'system' ? (prefersDarkMode ? 'dark' : 'light') : theme;

  // Toggle between light and dark themes
  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
    if (mode === 'system') {
      setMode('light');
    }
  }, [mode, setMode, setTheme]);

  // Apply theme to document
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(activeTheme || 'light');

    // Optional: Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        activeTheme === 'dark' ? '#1a1a1a' : '#ffffff'
      );
    }
  }, [activeTheme]);

  return {
    theme: activeTheme || 'light',
    mode: mode || 'system',
    setTheme,
    setMode,
    toggleTheme,
    isLight: activeTheme === 'light',
    isDark: activeTheme === 'dark',
    isSystem: mode === 'system',
  };
};

export default useTheme;
