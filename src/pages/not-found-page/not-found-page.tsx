import { NavLink } from 'react-router-dom';

import style from './not-found-page.module.css';

export default function NotFoundPage() {
  return (
    <div className={style.container}>
      <h1>404</h1>
      <h2>Page not found</h2>
      <NavLink to="/">
        Go to home
      </NavLink>
    </div>
  );
}
