/* eslint-disable react/require-default-props */
import { NavLink, useLocation } from 'react-router';

import { Icon, Button, List } from '@gravity-ui/uikit';
import { Plus, ChevronUp, ChevronDown } from '@gravity-ui/icons';

import style from './list.module.css';

type ListType = {
  sidebarWidth: number;
  show: boolean;
  onShow: () => void;
  items: string[];
  title: string;
  action?: (e: string, i: number) => void;
};

export default function SidebarList({
  sidebarWidth,
  show,
  onShow,
  items,
  title,
  action,
}: ListType) {
  const location = useLocation();

  return (
    <div className={style.list}>
      <div className={style.buttons}>
        <Button
          view="outlined"
          onClick={onShow}
          className={style.button}
          size="l"
        >
          <Icon data={show ? ChevronUp : ChevronDown} size={20} />
          {sidebarWidth > 150 && (
            <div className={style.title}>
              {title}
            </div>
          )}
        </Button>
        {sidebarWidth > 150 && action
          && (
            <NavLink to="/users" className={style.icon} state={{ pathname: location }}>
              <Icon data={Plus} size={20} />
            </NavLink>
          )}
      </div>

      {show && (
        <div className={style.items}>
          <List
            items={items}
            itemsHeight={220}
            filterable={sidebarWidth > 150}
            onItemClick={action}
            itemClassName={style.lst}
          />
        </div>
      )}
    </div>
  );
}
