/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, Text } from '@gravity-ui/uikit';

import style from './sign-footer.module.css';

export default function SignFooter() {
  return (
    <div>
      <Text
        variant="subheader-2"
        className={style.xl}
      >
        Войти с помощью
      </Text>
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
