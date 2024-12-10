import { NavLink } from 'react-router-dom';

import style from './not-found-page.module.css';

export default function NotFoundPage() {
  return (
    <div className={style.container}>
      <h1 className={style.title}>404</h1>
      <h2 className={style.subtitle}>Нет такой страницы</h2>
      <div className={style.text}>
        {'Вы можете перейти на '}
        <NavLink
          to="/"
          className={style.link}
        >
          главную
        </NavLink>
      </div>
    </div>
  );
}
