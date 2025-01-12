import { Link } from 'react-router-dom';

import HomeButton from '../../components/home-button/home-button.tsx';

import style from './signin-page.module.css';

export default function Header() {
  return (
    <div className={style.header}>
      <HomeButton />
      <Link
        to="/signup"
        className={style.signin}
      >
        Signup
      </Link>
    </div>
  );
}
