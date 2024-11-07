/* eslint-disable import/no-extraneous-dependencies */
import classNames from 'classnames';
import { IoIosSearch } from 'react-icons/io';

import style from './search.module.css';

export default function Sidebar({ sidebarWidth }: { sidebarWidth: number; }) {
  return (
    <div className={classNames(style.header)}>
      <div className={style.search}>
        <div className={style.icon}>
          <IoIosSearch />
        </div>
        {sidebarWidth >= 120 && <div className={style.title}>Search</div>}
      </div>
    </div>
  );
}
