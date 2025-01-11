import { Link } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';

import style from './reset-password-page.module.css';

export type FormPayload = Omit<User, 'id'>;

export default function Header() {
  return (
    <div className={style.header}>
      <Link
        to="/"
        className={style.home}
      >
        <IoMdArrowBack />
      </Link>
    </div>
  );
}
