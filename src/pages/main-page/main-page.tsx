import { Outlet } from 'react-router-dom';

import Sidebar from '../../components/sidebar/sidebar.tsx';
// import Board from '../../components/board/board.tsx';

import style from './main-page.module.css';

export default function MainPage() {
  return (
    <div className={style.container}>
      <Sidebar />
      <Outlet />
      {/* <Board /> */}
    </div>
  );
}
