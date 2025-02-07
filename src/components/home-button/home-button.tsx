/* eslint-disable import/no-extraneous-dependencies */
import { Link } from '@gravity-ui/uikit';
import { ChevronLeft } from '@gravity-ui/icons';

// import style from './home-button.module.css';

export type FormPayload = Omit<User, 'id'>;

export default function HomeButton() {
  return (
    <Link
      href="/"
      view="normal"
      // className={style.home}
    >
      <ChevronLeft />
    </Link>
  );
}
