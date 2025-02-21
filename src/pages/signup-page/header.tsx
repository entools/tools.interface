/* eslint-disable import/no-extraneous-dependencies */
// import { Link } from 'react-router-dom';
import { Link } from '@gravity-ui/uikit';

import HomeButton from '../../components/home-button/home-button.tsx';

import style from './signup-page.module.css';

export default function Header() {
  return (
    <div className={style.header}>
      <HomeButton />
      <Link
        view="normal"
        href="/signin"
        // className={style.signup}
      >
        Войти
      </Link>
    </div>
  );
}
