/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unsafe-optional-chaining */
import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';

import style from './sidebar.module.css';

export default function Sidebar() {
  const initSidebarWidth = localStorage.getItem('sidebar');
  const sidebarRef = useRef<HTMLInputElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(Number(initSidebarWidth) || 310);

  const startResizing = useCallback((mouseDownEvent: React.MouseEvent) => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
    localStorage.setItem('sidebar', sidebarWidth.toString());
  }, [sidebarWidth]);

  const resize = useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing) {
        setSidebarWidth(
          mouseMoveEvent.clientX
          - sidebarRef.current!.getBoundingClientRect()?.left,
        );
      }
    },
    [isResizing],
  );

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);

    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <div
      className={classNames(style.sidebar, { [style.small]: sidebarWidth < 100 })}
      ref={sidebarRef}
      style={{ width: sidebarWidth }}
    >
      <div className={style.container}>
        <div className={classNames(style.header)}>
          <div className={style.logo}>
            {sidebarWidth}
          </div>
        </div>
        <div className={style.list}>
          <div className={style.item__header}>list</div>
          <div className={style.item}>{sidebarWidth < 100 ? 'i1' : 'item 1'}</div>
          <div className={style.item}>{sidebarWidth < 100 ? 'i2' : 'item 2'}</div>
          <div className={style.item}>{sidebarWidth < 100 ? 'i3' : 'item 3'}</div>
          <div className={style.item}>{sidebarWidth < 100 ? 'i4' : 'item 4'}</div>
          <div className={style.item}>{sidebarWidth < 100 ? 'i5' : 'item 5'}</div>
          <div className={style.item}>{sidebarWidth < 100 ? 'i6' : 'item 6'}</div>
          <div className={style.item}>{sidebarWidth < 100 ? 'i7' : 'item 7'}</div>
          <div className={style.item}>{sidebarWidth < 100 ? 'i8' : 'item 8'}</div>
          <div className={style.item}>{sidebarWidth < 100 ? 'i9' : 'item 9'}</div>
          <div className={style.item}>{sidebarWidth < 100 ? 'i1' : 'item 1'}</div>
          <div className={style.item}>{sidebarWidth < 100 ? 'i2' : 'item 2'}</div>
          <div className={style.item}>{sidebarWidth < 100 ? 'i3' : 'item 3'}</div>
          <div className={style.item}>{sidebarWidth < 100 ? 'i4' : 'item 4'}</div>
        </div>
        <div className={classNames(style.footer)}>
          <div className={style.profile}>
            {sidebarWidth < 100 ? 'f' : 'footer'}
          </div>
        </div>
      </div>

      <div
        className={style.sidebar__resizer}
        onMouseDown={startResizing}
      />
    </div>
  );
}
