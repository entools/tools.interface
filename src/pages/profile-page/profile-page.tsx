import style from './profile-page.module.css';

function ProfilePage() {
  return (
    <div className={style.layout}>
      <h2 className={style.title}>
        Profile
      </h2>
      <div className={style.form}>
        <div>
          <div>status</div>
          <div>picture</div>
          <div>login</div>
          <div>email</div>
        </div>
        <div>
          <div>theme</div>
          <div>notification</div>
        </div>
        <div>save</div>
      </div>
    </div>
  );
}

export default ProfilePage;
