import style from './profile-page.module.css';

function ProfilePage() {
  return (
    <div className={style.layout}>
      <h2 className={style.title}>
        Profile
      </h2>
      <div className={style.form}>
        <div className={style.main}>
          <div>status</div>
          <div>picture</div>
          <div>login</div>
          <div>email</div>
        </div>
        <div className={style.main}>
          <div>theme</div>
          <div>notification</div>
        </div>
        <div className={style.main}>save</div>
      </div>
    </div>
  );
}

export default ProfilePage;
