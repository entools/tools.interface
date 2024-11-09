/* eslint-disable import/no-extraneous-dependencies */
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { IoIosAdd, IoIosArrowDown } from 'react-icons/io';

import style from './logo.module.css';

export default function Logo({ sidebarWidth }: { sidebarWidth: number; }) {
  return (
    <div className={classNames(style.header, { [style.small]: sidebarWidth < 120 })}>
      <div className={style.logo}>
        <div className={style.icon}>
          <IoIosAdd />
        </div>
        {sidebarWidth >= 148 && (
          <>
            <div className={style.button}>
              <IoIosArrowDown />
            </div>
            <NavLink to="/" className={style.title}>
              C
              {sidebarWidth}
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}
