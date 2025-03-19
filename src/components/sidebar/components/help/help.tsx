import { NavLink } from 'react-router';

import { Icon, Text, Button } from '@gravity-ui/uikit';
import { Bookmark } from '@gravity-ui/icons';

import style from './help.module.css';

export default function Help({ sidebarWidth }: { sidebarWidth: number; }) {
  return (
    <NavLink to="/about" className={style.help}>
      <Button
        size="l"
        view="outlined"
        className={style.button}
      >
        <Icon data={Bookmark} size={20} />
        {sidebarWidth >= 148 && <Text variant="subheader-2">Support</Text>}
      </Button>
    </NavLink>
  );
}
