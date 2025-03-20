import { Link, useLocation } from 'react-router';

import { Icon, Text, Button } from '@gravity-ui/uikit';
import { Magnifier } from '@gravity-ui/icons';

import style from './search.module.css';

export default function Sidebar({ sidebarWidth }: { sidebarWidth: number; }) {
  const location = useLocation();

  return (
    <div className={style.header}>
      <Link to="/search" className={style.search} state={{ pathname: location }}>
        <Button view="outlined" size="l" className={style.button}>
          <Icon data={Magnifier} size={20} />
          {sidebarWidth >= 150 && <Text variant="subheader-2">Search</Text>}
        </Button>
      </Link>
    </div>
  );
}
