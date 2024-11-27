import { useState, useEffect } from 'react';

export default function useDarkTheme() {
  const currentTheme = localStorage.getItem('data-theme');
  const condition = currentTheme === 'dark' ? 'dark' : 'light';
  const [isDark, setIsDark] = useState(condition);

  const toggleIsDark = (value: string) => {
    setIsDark(value);

    // if (window.matchMedia('(prefers-color-scheme: dark)').matches) {

    // }
    localStorage.setItem('data-theme', value);
    // console.log(value);
    // setIsDark(isDark === 'light' ? 'dark' : 'light');
    // localStorage.setItem('data-theme', isDark === 'light' ? 'dark' : 'light');
  };

  const providerValue = { isDark, toggleIsDark };

  useEffect(() => document.documentElement.setAttribute('data-theme', condition), [isDark]);

  return { providerValue };
}
