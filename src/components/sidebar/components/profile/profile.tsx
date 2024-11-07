/* eslint-disable import/no-extraneous-dependencies */
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { IoMdNotifications, IoMdPerson } from 'react-icons/io';

import style from './profile.module.css';

export default function Profile({ sidebarWidth }: { sidebarWidth: number; }) {
  return (
    <div className={classNames(style.profile, { [style.column]: sidebarWidth < 120 })}>
      <div className={style.block}>
        <NavLink to="/profile" className={style.pic}>
          <IoMdPerson />
        </NavLink>
        {sidebarWidth >= 148 && (
          <div className={style.name}>
            Profile
          </div>
        )}
      </div>
      <div className={style.notification}>
        <IoMdNotifications />
      </div>
    </div>
  );
}
