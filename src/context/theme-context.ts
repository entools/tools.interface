import { createContext } from 'react';

// type ThemeType = { isDark: string, toggleIsDark: (value: string) => void };

// // Context lets us pass a value deep into the component tree
// // without explicitly threading it through every component.
// // Create a context for the current theme (with "light" as the default).
// // @ts-ignore
// const ThemeContext = createContext<ThemeType>({ isDark: false, toggleIsDark: 'light' });

// export default ThemeContext;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const supportedThemes = {
  light: 'light',
  dark: 'dark',
  system: 'system',
};

type Themes = keyof typeof supportedThemes;

const ThemeContext = createContext<
  | {
      theme: Themes;
      setTheme:(theme: Themes) => void;
      supportedThemes: { [key: string]: string };
        }
        | undefined
        >(undefined);

export default ThemeContext;
export { supportedThemes };
