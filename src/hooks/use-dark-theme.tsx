/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/jsx-no-constructed-context-values */
import { useState, useEffect, useContext } from 'react';
import { ThemeProvider } from '@gravity-ui/uikit';
import { ToastContainer } from 'react-toastify';

import ThemeContext, { supportedThemes } from '../context/theme-context';

type Themes = keyof typeof supportedThemes;

const getTheme = (): Themes => {
  let theme = localStorage.getItem('data-theme');

  if (!theme || theme === 'undefined') {
    localStorage.setItem('data-theme', 'light');
    theme = 'light';
  }

  return theme as Themes;
};

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'You can use "useTheme" hook only within a <ThemeProvider> component.',
    );
  }

  return context;
}

export default function Theme({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Themes>(getTheme);

  useEffect(() => {
    localStorage.setItem('data-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        supportedThemes,
      }}
    >
      <ThemeProvider theme={theme}>
        {children}
        <ToastContainer theme={theme} />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
