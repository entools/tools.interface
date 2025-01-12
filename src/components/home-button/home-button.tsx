import { Link } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';

import style from './home-button.module.css';

export type FormPayload = Omit<User, 'id'>;

export default function HomeButton() {
  return (
    <Link
      to="/"
      className={style.home}
    >
      <IoMdArrowBack />
    </Link>
  );
}
