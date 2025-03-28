/* eslint-disable react/require-default-props */
import { NavLink, useLocation } from 'react-router';
import { v4 as uuidv4 } from 'uuid';

import { Icon, Button } from '@gravity-ui/uikit';
import { Plus, ChevronUp, ChevronDown } from '@gravity-ui/icons';

import classNames from 'classnames';

import style from './list.module.css';

type ListType = {
  sidebarWidth: number;
  show: boolean;
  onShow: () => void;
  items: string[];
  title: string;
  action?: () => void;
};

export default function List({
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
          {items.map((_, i) => (
            <div key={uuidv4()} className={style.box}>
              <NavLink
                to={`/projects/123/documents/${i}`}
                className={classNames(style.item, { [style.center]: sidebarWidth <= 150 })}
              >
                {sidebarWidth < 100 ? `${i}` : `doc ${i}`}
              </NavLink>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
