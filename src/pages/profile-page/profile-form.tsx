import classNames from 'classnames';

import style from './profile-page.module.css';

export default function ProfileForm() {
  return (
    <form className={style.account}>
      <div className={style.avatar}>
        <div className={style.picture}>U</div>
        <input
          className={classNames('input', style.status)}
          placeholder="status"
        />
      </div>

      <input
        className="input"
        placeholder="login"
      />
      <input
        className="input"
        placeholder="email"
      />
      <button
        type="button"
        className="button"
      >
        save
      </button>
    </form>
  );
}
