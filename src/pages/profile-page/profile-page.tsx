import ProfileForm from './profile-form.tsx';
import ProfileSettings from './profile-settings.tsx';

import style from './profile-page.module.css';

function ProfilePage() {
  return (
    <div className="layout">
      <h2 className="title">
        Profile
      </h2>
      <div className={style.form}>
        <ProfileForm />
        <ProfileSettings />
      </div>
    </div>
  );
}

export default ProfilePage;
