import classNames from 'classnames';

import style from './search.module.css';

export default function Sidebar({ sidebarWidth }: { sidebarWidth: number; }) {
  return (
    <div className={classNames(style.header)}>
      <div className={style.search}>
        {sidebarWidth < 100 ? 's' : 'search'}
      </div>
    </div>
  );
}
