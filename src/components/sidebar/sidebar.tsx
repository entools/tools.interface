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
import List from './components/list/list.tsx';
import Help from './components/help/help.tsx';

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
    // _mouseDownEvent.stopPropagation();
    _mouseDownEvent.preventDefault();
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
      <div className={classNames(style.container, style['no-select'])}>
        <Logo sidebarWidth={sidebarWidth} />
        <Search sidebarWidth={sidebarWidth} />
        <div className={style.list__container}>
          <List
            title="Documents"
            sidebarWidth={sidebarWidth}
            show={showDocuments}
            onShow={onShowDocuments}
            items={['document']}
          />
          <List
            title="Teams"
            sidebarWidth={sidebarWidth}
            show={showTeams}
            onShow={onShowTeams}
            items={new Array(10).fill(1).map((i) => i.toString())}
          />
        </div>
        <div className={classNames(style.footer)}>
          <Help sidebarWidth={sidebarWidth} />
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
