/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from 'react';
import { Text } from '@gravity-ui/uikit';

import { useUpdateUserProfileMutation } from '~/store';

import useUser from '../../hooks/use-user';

import style from './profile-page.module.css';

const ProfileForm = lazy(() => import('./profile-form'));
const ProfileSettings = lazy(() => import('./profile-settings'));

export type FormPayload = Omit<User, 'id'>;

function ProfilePage() {
  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();
  const { id } = useUser()!;

  const onSubmit = async (data: FormPayload) => {
    const { email, firstName, lastName } = data;
    await updateUserProfile({
      email, firstName, lastName, id,
    });
  };

  return (
    <Suspense>
      <div className="layout">
        <Text variant="header-2">Profile</Text>
        <div className={style.form}>
          <ProfileForm onSubmit={onSubmit} isLoading={isLoading} />
          <ProfileSettings />
        </div>
      </div>
    </Suspense>
  );
}

export default ProfilePage;
