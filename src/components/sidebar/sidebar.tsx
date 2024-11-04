/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unsafe-optional-chaining */
import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';

import Logo from './components/logo/logo.tsx';
import Search from './components/search/search.tsx';
import Profile from './components/profile/profile.tsx';

import style from './sidebar.module.css';

export default function Sidebar() {
  const initSidebarWidth = localStorage.getItem('sidebar');
  const initDocuments = localStorage.getItem('documents') === 'true';
  const initTeams = localStorage.getItem('teams') === 'true';
  const sidebarRef = useRef<HTMLInputElement>(null);
  const [showTeams, setShowTeams] = useState(initTeams);
  const [showDocuments, setShowDocuments] = useState<boolean>(initDocuments);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(Number(initSidebarWidth) || 310);

  const startResizing = useCallback((_mouseDownEvent: React.MouseEvent) => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
    localStorage.setItem('sidebar', sidebarWidth.toString());
  }, [sidebarWidth]);

  const onShowDocuments = () => {
    const curr = !showDocuments;
    setShowDocuments(curr);
    localStorage.setItem('documents', curr.toString());
  };
  const onShowTeams = () => {
    const curr = !showTeams;
    setShowTeams(curr);
    localStorage.setItem('teams', curr.toString());
  };

  const resize = useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing) {
        const width = mouseMoveEvent.clientX
        - sidebarRef.current!.getBoundingClientRect()?.left >= 60
          ? mouseMoveEvent.clientX - sidebarRef.current!.getBoundingClientRect()?.left
          : 60;
        setSidebarWidth(width);
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
        <Logo sidebarWidth={sidebarWidth} />
        <Search sidebarWidth={sidebarWidth} />
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
                onClick={onShowDocuments}
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
                onClick={onShowTeams}
              >
                {showTeams ? '-' : '+'}
              </button>
            </div>

            {showTeams && (
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
          <Profile sidebarWidth={sidebarWidth} />
        </div>
      </div>
      <div
        className={style.sidebar__resizer}
        onMouseDown={startResizing}
      />
    </div>
  );
}
