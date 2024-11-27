import { useState, useEffect } from 'react';

export default function useDarkTheme() {
  const currentTheme = localStorage.getItem('data-theme');
  let condition = 'light'; // currentTheme === 'dark' ? 'dark' : 'light';

  if (currentTheme === 'light') {
    condition = 'light';
  } else if (currentTheme === 'dark') {
    condition = 'dark';
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    condition = 'dark';
  }

  const [isDark, setIsDark] = useState(currentTheme || 'system');

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
