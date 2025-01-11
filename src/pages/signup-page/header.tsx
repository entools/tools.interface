import { Link } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';

import style from './signup-page.module.css';

export type FormPayload = Omit<User, 'id'>;

export default function Header() {
  return (
    <div className={style.header}>
      <Link
        to="/"
        className={style.signin}
      >
        <IoMdArrowBack />
      </Link>
      <Link
        to="/signin"
        className={style.signup}
      >
        Signin
      </Link>
    </div>
  );
}
