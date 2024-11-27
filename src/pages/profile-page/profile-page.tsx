import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { CustomSelect as Select } from '../../components/select/select.tsx';
import useDarkTheme from '../../hooks/use-dark-theme.tsx';

import style from './profile-page.module.css';

type SelectType = { value: string; label: string; };

const options = [
  { value: 'sytem', label: 'sytem' },
  { value: 'dark', label: 'dark' },
  { value: 'light', label: 'light' },
];

function ProfilePage() {
  // const initTheme = localStorage.getItem('theme');
  const { providerValue: { toggleIsDark, isDark } } = useDarkTheme();
  const current = options.find((x) => x.value === isDark);
  const [theme, setTheme] = useState<SelectType | null>(current || options[0]);
  const [notification, setNotification] = useState(true);

  useEffect(() => {
    if (theme) {
      if (theme.value === 'light') {
        toggleIsDark('light');
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        toggleIsDark('dark');
      } else {
        toggleIsDark(theme.value);
      }
    }
  }, [theme]);

  return (
    <div className="layout">
      <h2 className="title">
        Profile
      </h2>
      <div className={style.form}>
        <div className={style.account}>
          <div className={style.avatar}>
            <div className={style.picture}>U</div>
            <input
              className={classNames('input', style.status)}
              placeholder="status"
            />
          </div>

          <input
            className="input"
            placeholder="login"
          />
          <input
            className="input"
            placeholder="email"
          />
          <button
            type="button"
            className="button"
          >
            save
          </button>
        </div>
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
          <div className={style.base}>base</div>
        </div>

      </div>
    </div>
  );
}

export default ProfilePage;
