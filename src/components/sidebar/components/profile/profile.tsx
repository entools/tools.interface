import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import style from './profile.module.css';

export default function Profile({ sidebarWidth }: { sidebarWidth: number; }) {
  return (
    <div className={classNames(style.profile, { [style.column]: sidebarWidth < 120 })}>
      <NavLink to="/profile" className={style.pic}>
        a
      </NavLink>
      <div className={style.name}>
        {sidebarWidth >= 120 && 'footer'}
      </div>
      <div className={style.notification}>
        !
      </div>
    </div>
  );
}
