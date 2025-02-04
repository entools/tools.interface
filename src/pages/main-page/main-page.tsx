/* eslint-disable react-refresh/only-export-components */
import { Outlet } from 'react-router-dom';

import Sidebar from '../../components/sidebar/sidebar.tsx';
// import Board from '../../components/board/board.tsx';

import withUser from '../../hocs/with-user.tsx';

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
