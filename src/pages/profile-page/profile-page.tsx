import { useEffect, useState } from 'react';
import { CustomSelect as Select } from '../../components/select/select.tsx';

import style from './profile-page.module.css';

type SelectType = { value: string; label: string; };

const options = [
  { value: 'sytem', label: 'sytem' },
  { value: 'dark', label: 'dark' },
  { value: 'light', label: 'light' },
];

function ProfilePage() {
  // const initTheme = localStorage.getItem('theme');
  const [theme, setTheme] = useState<SelectType | null>(null);

  useEffect(() => {
    if (theme) {
      if (theme.value === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', theme.value);
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
          <div className={style.picture}>U</div>
          <input
            className="input"
            placeholder="status"
          />
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
            {`theme ${theme?.value}`}
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
            notification
          </div>
          <div className={style.base}>base</div>
        </div>

      </div>
    </div>
  );
}

export default ProfilePage;
