/* eslint-disable react/no-array-index-key */
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
  const [showProjects, setShowProjects] = useState(true);
  const [showDocuments, setShowDocuments] = useState(true);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(Number(initSidebarWidth) || 310);

  const startResizing = useCallback((_mouseDownEvent: React.MouseEvent) => {
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
        <div className={classNames(style.header)}>
          <div className={style.search}>
            {sidebarWidth < 100 ? 's' : 'search'}
          </div>
        </div>
        <div className={style.list__container}>
          <div className={style.list}>
            <div className={style.item__header}>
              {sidebarWidth > 150 && (
                <div className={style.title}>
                  documents
                </div>
              )}
              <button
                type="button"
                className={style.show}
                onClick={() => setShowDocuments(!showDocuments)}
              >
                {showDocuments ? '-' : '+'}
              </button>
            </div>
            {showDocuments && (
              <div className={style.documents}>
                {new Array(1).fill(1).map((_, i) => (
                  <div className={style.item} key={i}>
                    {sidebarWidth < 100 ? `${i}` : `doc ${i}`}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={style.list}>

            <div className={style.item__header}>
              {sidebarWidth > 150 && (
              <div className={style.title}>
                teams
              </div>
              )}
              <button
                type="button"
                className={style.show}
                onClick={() => setShowProjects(!showProjects)}
              >
                {showProjects ? '-' : '+'}
              </button>
            </div>

            {showProjects && (
              <div className={style.documents}>
                {new Array(15).fill(1).map((_, i) => (
                  <div className={style.item} key={i}>
                    {sidebarWidth < 100 ? `${i}` : `user ${i}`}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
        <div className={classNames(style.footer)}>
          <div className={style.profile}>
            {sidebarWidth < 100 ? 'f' : '-footer-'}
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
