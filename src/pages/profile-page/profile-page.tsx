import style from './profile-page.module.css';

function ProfilePage() {
  return (
    <div className="layout">
      <h2 className="title">
        Profile
      </h2>
      <div className={style.form}>
        <div className={style.account}>
          <div className={style.picture}>U</div>
          <input
            className="input"
            placeholder="status"
          />
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
        </div>
        <div className={style.settings}>
          <div className={style.theme}>theme</div>
          <div className={style.notification}>notification</div>
          <div className={style.base}>base</div>
        </div>

      </div>
    </div>
  );
}

export default ProfilePage;
