import style from './profile-page.module.css';

function ProfilePage() {
  return (
    <div className={style.layout}>
      <h2 className={style.title}>
        Profile
      </h2>
      <div className={style.form}>
        <div className={style.main}>
          <div className={style.picture}>picture</div>
          <input
            className={style.input}
            placeholder="status"
          />
          <input
            className={style.input}
            placeholder="login"
          />
          <input
            className={style.input}
            placeholder="email"
          />
        </div>
        <div className={style.main}>
          <div>theme</div>
          <div>notification</div>
        </div>
        <button
          type="button"
          className={style.main}
        >
          save
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
