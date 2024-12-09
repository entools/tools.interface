/* eslint-disable react/require-default-props */
import { NavLink, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { IoIosAdd, IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
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
            {show ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
        </button>
        {sidebarWidth > 150 && action
          && (
            <NavLink to="/users" className={style.icon} state={{ pathname: location }}>
              <IoIosAdd />
            </NavLink>
          )}
      </div>

      {show && (
        <div className={style.items}>
          {items.map((_, i) => (
            <div key={uuidv4()} className={style.box}>
              <NavLink to={`/projects/123/documents/${i}`} className={style.item}>
                {sidebarWidth < 100 ? `${i}` : `doc ${i}`}
              </NavLink>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
