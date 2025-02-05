/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { CustomSelect as Select } from '../../components/select/select.tsx';

import useDarkTheme from '../../hooks/use-dark-theme.tsx';
import { useSignOutMutation } from '../../store/index.ts';

import style from './profile-page.module.css';

type SelectType = { value: string; label: string; };

const options = [
  { value: 'system', label: 'system' },
  { value: 'dark', label: 'dark' },
  { value: 'light', label: 'light' },
];

export default function ProfileSettings() {
  const { providerValue: { toggleIsDark, isDark } } = useDarkTheme();
  const current = options.find((x) => x.value === isDark);
  const [theme, setTheme] = useState<SelectType | null>(current || options[0]);
  const [notification, setNotification] = useState(true);
  const [signOut] = useSignOutMutation();

  const onLogout = async () => {
    await signOut();
  };

  useEffect(() => {
    if (theme) {
      toggleIsDark(theme.value);
    }
  }, [theme]);

  return (
    <div className={style.settings}>
      <div className={style.theme}>
        theme
        <div className={style.select}>
          <Select
            name="theme"
            options={options}
            action={setTheme}
            value={theme}
          />
        </div>
      </div>

      <div className={style.notification}>
        <div className={style.block}>
          notification
          <button
            type="button"
            className="button"
            onClick={() => setNotification(!notification)}
          >
            {`${notification ? 'on' : 'off'}`}
          </button>
        </div>
      </div>

      <div className={style.base}>
        base
        <button
          type="button"
          onClick={onLogout}
          className={classNames('button', style.button)}
        >
          Выйти
        </button>
      </div>
    </div>
  );
}
