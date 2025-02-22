/* eslint-disable react-refresh/only-export-components */
import { Outlet } from 'react-router-dom';

import Sidebar from '../../components/sidebar/sidebar';

import withUser from '../../hocs/with-user';

import style from './main-page.module.css';

function MainPage() {
  return (
    <div className={style.container}>
      <Sidebar />
      <Outlet />
      {/* <Board /> */}
    </div>
  );
}

export default withUser(MainPage, true);
