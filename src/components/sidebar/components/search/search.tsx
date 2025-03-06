import { Link, useLocation } from 'react-router-dom';

import { Icon, Text } from '@gravity-ui/uikit';
import { Magnifier } from '@gravity-ui/icons';

import style from './search.module.css';

export default function Sidebar({ sidebarWidth }: { sidebarWidth: number; }) {
  const location = useLocation();

  return (
    <div className={style.header}>
      <Link to="/search" className={style.search} state={{ pathname: location }}>
        <Icon className={style.icon} data={Magnifier} size={20} />
        {sidebarWidth >= 120 && <Text variant="subheader-2">Search</Text>}
      </Link>
    </div>
  );
}
