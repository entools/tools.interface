/* eslint-disable import/no-extraneous-dependencies */
import { NavLink } from 'react-router-dom';
import { IoMdBookmark } from 'react-icons/io';

import style from './help.module.css';

export default function Help({ sidebarWidth }: { sidebarWidth: number; }) {
  return (
    <NavLink to="/about" className={style.help}>
      <div className={style.icon}>
        <IoMdBookmark />
      </div>
      {sidebarWidth >= 148
      && <div className={style.title}>Support</div>}
    </NavLink>
  );
}
