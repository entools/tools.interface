import HomeButton from '../../components/home-button/home-button.tsx';

import style from './reset-password-page.module.css';

export default function Header() {
  return (
    <div className={style.header}>
      <HomeButton />
    </div>
  );
}
