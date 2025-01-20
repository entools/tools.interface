import ProfileForm from './profile-form.tsx';
import ProfileSettings from './profile-settings.tsx';

import style from './profile-page.module.css';

export type FormPayload = Omit<User, 'id'>;

function ProfilePage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (data: FormPayload) => {
  };

  return (
    <div className="layout">
      <h2 className="title">
        Profile
      </h2>
      <div className={style.form}>
        <ProfileForm onSubmit={onSubmit} />
        <ProfileSettings />
      </div>
    </div>
  );
}

export default ProfilePage;
