/* eslint-disable react/require-default-props */
import { NavLink } from 'react-router-dom';
import { IoIosAdd } from 'react-icons/io';
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
  return (
    <div className={style.list}>
      <div className={style.buttons}>
        <button
          className={style.header}
          type="button"
          onClick={onShow}
        >
          {sidebarWidth > 150 && (
            <div className={style.title}>
              {title}
            </div>
          )}
          <div className={style.show}>
            {show ? '-' : '+'}
          </div>
        </button>
        {sidebarWidth > 150 && action
          && (
            <NavLink to="/" className={style.icon}>
              <IoIosAdd />
            </NavLink>
          )}
      </div>

      {show && (
        <div className={style.items}>
          {items.map((item, i) => (
            <NavLink key={item} to={`/projects/123/documents/${i}`} className={style.item}>
              {sidebarWidth < 100 ? `${i}` : `doc ${i}`}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}
