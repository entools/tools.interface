import { NavLink } from 'react-router-dom';
import style from './list.module.css';

type ListType = {
  sidebarWidth: number;
  show: boolean;
  onShow: () => void;
  items: string[];
  title: string;
};

export default function List({
  sidebarWidth,
  show,
  onShow,
  items,
  title,
}: ListType) {
  return (
    <div className={style.list}>
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
      {show && (
        <div className={style.items}>
          {items.map((item, i) => (
            <NavLink key={item} to="/document" className={style.item}>
              {sidebarWidth < 100 ? `${i}` : `doc ${i}`}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}
