import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@gravity-ui/uikit';
import { Magnifier } from '@gravity-ui/icons';

import style from './search.module.css';

export default function Sidebar({ sidebarWidth }: { sidebarWidth: number; }) {
  const location = useLocation();

  return (
    <div className={style.header}>
      <Link to="/search" className={style.search} state={{ pathname: location }}>
        <Icon className={style.icon} data={Magnifier} size={16} />
        {sidebarWidth >= 120 && <div className={style.title}>Search</div>}
      </Link>
    </div>
  );
}
