/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Button, Select } from '@gravity-ui/uikit';
// import classNames from 'classnames';

// import { CustomSelect as Select } from '../../components/select/select.tsx';

import { useTheme } from '../../hooks/use-dark-theme.tsx';
import { useSignOutMutation } from '../../store/index.ts';

// import { supportedThemes } from '../../context/theme-context.ts';

import style from './profile-page.module.css';

// type Themes = keyof typeof supportedThemes;

const options = [
  { value: 'system', content: 'system' },
  { value: 'dark', content: 'dark' },
  { value: 'light', content: 'light' },
];

export default function ProfileSettings() {
  const { theme, setTheme } = useTheme();
  const [notification, setNotification] = useState(true);
  const [signOut] = useSignOutMutation();

  const onLogout = async () => {
    await signOut();
  };
  const onSet = (v: string[]) => {
    const [value] = v as 'dark'[] | 'light'[] | 'system'[];
    setTheme(value);
  };

  useEffect(() => {
    if (theme) {
      setTheme(theme);
    }
  }, [theme]);

  return (
    <div className={style.settings}>
      <div className={style.theme}>
        theme
        <div className={style.select}>
          <Select
            name="theme"
            size="l"
            width="max"
            options={options}
            onUpdate={onSet}
            defaultValue={[theme]}
          />
        </div>
      </div>

      <div className={style.notification}>
        <div className={style.block}>
          notification
          <Button
            type="button"
            view="normal"
            pin="round-round"
            size="l"
            onClick={() => setNotification(!notification)}
          >
            {`${notification ? 'on' : 'off'}`}
          </Button>
        </div>
      </div>

      <div className={style.base}>
        base
        <Button
          type="button"
          view="normal"
          pin="round-round"
          size="l"
          onClick={onLogout}
        >
          Выйти
        </Button>
      </div>
    </div>
  );
}
