/* eslint-disable import/no-extraneous-dependencies */
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { IoIosAdd } from 'react-icons/io';

import style from './logo.module.css';

export default function Logo({ sidebarWidth }: { sidebarWidth: number; }) {
  return (
    <div className={classNames(style.header, { [style.small]: sidebarWidth < 120 })}>
      <div className={style.logo}>
        <div className={style.pic}>
          <IoIosAdd />
        </div>
        {sidebarWidth >= 148 && (
          <NavLink to="/" className={style.title}>
            {sidebarWidth}
          </NavLink>
        )}
      </div>
    </div>
  );
}
