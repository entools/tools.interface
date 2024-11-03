import classNames from 'classnames';

import style from './logo.module.css';

export default function Logo({ sidebarWidth }: { sidebarWidth: number; }) {
  return (
    <div className={classNames(style.header)}>
      <div className={style.logo}>
        {sidebarWidth}
      </div>
    </div>
  );
}
