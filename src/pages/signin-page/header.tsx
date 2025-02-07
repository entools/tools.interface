/* eslint-disable import/no-extraneous-dependencies */
// import { Link } from 'react-router-dom';
import { Link } from '@gravity-ui/uikit';

import HomeButton from '../../components/home-button/home-button.tsx';

import style from './signin-page.module.css';

export default function Header() {
  return (
    <div className={style.header}>
      <HomeButton />
      <Link
        view="normal"
        href="/signup"
        // className={style.signin}
      >
        Регистрация
      </Link>
    </div>
  );
}
