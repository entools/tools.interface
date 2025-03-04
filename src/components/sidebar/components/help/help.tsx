import { NavLink } from 'react-router-dom';
import { Icon, Text } from '@gravity-ui/uikit';
import { Bookmark } from '@gravity-ui/icons';

import style from './help.module.css';

export default function Help({ sidebarWidth }: { sidebarWidth: number; }) {
  return (
    <NavLink to="/about" className={style.help}>
      <Icon className={style.icon} data={Bookmark} size={20} />
      {sidebarWidth >= 148 && <Text variant="subheader-2">Support</Text>}
    </NavLink>
  );
}
