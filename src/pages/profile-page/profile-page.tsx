/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from 'react';
import { Text } from '@gravity-ui/uikit';

import style from './profile-page.module.css';

const ProfileForm = lazy(() => import('./profile-form'));
const ProfileSettings = lazy(() => import('./profile-settings'));

export type FormPayload = Omit<User, 'id'>;

function ProfilePage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (data: FormPayload) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <Suspense>
      <div className="layout">
        <Text variant="header-2">Profile</Text>
        <div className={style.form}>
          <ProfileForm onSubmit={onSubmit} />
          <ProfileSettings />
        </div>
      </div>
    </Suspense>
  );
}

export default ProfilePage;
