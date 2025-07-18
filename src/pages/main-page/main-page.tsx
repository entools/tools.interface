/* eslint-disable react-refresh/only-export-components */
import { useEffect } from 'react';
import { Outlet } from 'react-router';

import withUser from '../../hocs/with-user';
import { useGetCurrentProjectMutation, useGetProjectsMutation } from '~/store';

import Sidebar from '../../components/sidebar/sidebar';

import style from './main-page.module.css';

function MainPage() {
  const [getCurrentProject] = useGetCurrentProjectMutation();
  const [getProjects] = useGetProjectsMutation();

  useEffect(() => {
    getCurrentProject();
    getProjects();
  }, []);

  return (
    <div className={style.container}>
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default withUser(MainPage, true);
