import { createContext } from 'react';

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
