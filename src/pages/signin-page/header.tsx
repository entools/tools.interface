import { Link } from '@gravity-ui/uikit';

import HomeButton from '../../components/home-button/home-button';

import style from './signin-page.module.css';

export default function Header() {
  return (
    <div className={style.header}>
      <HomeButton />
      <Link
        view="normal"
        href="/signup"
      >
        Регистрация
      </Link>
    </div>
  );
}
