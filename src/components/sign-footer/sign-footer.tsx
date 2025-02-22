/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from '@gravity-ui/uikit';

import style from './sign-footer.module.css';

export default function SignFooter() {
  return (
    <div className={style.footer}>
      <h2 className={style.title}>Войти с помощью</h2>
      <ul className={style.links}>
        <li className={style.link}>
          <Link
            view="normal"
            href="#"
          >
            Link 1
          </Link>
        </li>
        <li className={style.link}>
          <Link
            view="normal"
            href="#"
          >
            Link 2
          </Link>
        </li>
      </ul>
    </div>
  );
}
