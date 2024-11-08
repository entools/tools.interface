/* eslint-disable import/no-extraneous-dependencies */
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { IoIosSearch } from 'react-icons/io';

import style from './search.module.css';

export default function Sidebar({ sidebarWidth }: { sidebarWidth: number; }) {
  const location = useLocation();

  return (
    <div className={classNames(style.header)}>
      <Link to="/search" className={style.search} state={{ pathname: location }}>
        <div className={style.icon}>
          <IoIosSearch />
        </div>
        {sidebarWidth >= 120 && <div className={style.title}>Search</div>}
      </Link>
    </div>
  );
}
