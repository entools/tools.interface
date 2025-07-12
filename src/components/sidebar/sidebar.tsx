/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unsafe-optional-chaining */
import {
  useCallback, useEffect, useRef, useState, Suspense, lazy,
} from 'react';
import classNames from 'classnames';

import { useNavigate } from 'react-router';
import Search from './components/search/search';
import List from './components/list/list';

import style from './sidebar.module.css';
import { useAppSelector } from '~/hooks';
import { documentsSelector, projectSelector, useGetUserDocumentsMutation } from '~/store';

const Logo = lazy(() => import('./components/logo/logo'));
const Help = lazy(() => import('./components/help/help'));
const Profile = lazy(() => import('./components/profile/profile'));

export default function Sidebar() {
  const navigate = useNavigate();
  const project = useAppSelector(projectSelector);
  const documents = useAppSelector(documentsSelector);
  const [getUserDocuments] = useGetUserDocumentsMutation();

  const initSidebarWidth = localStorage.getItem('sidebar');
  const initDocuments = localStorage.getItem('documents') === 'true';
  // const initTeams = localStorage.getItem('teams') === 'true';
  const sidebarRef = useRef<HTMLInputElement>(null);
  // const [showTeams, setShowTeams] = useState(initTeams);
  const [showDocuments, setShowDocuments] = useState<boolean>(initDocuments);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(Number(initSidebarWidth) || 310);

  const startResizing = useCallback((_mouseDownEvent: React.MouseEvent) => {
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
  // const onShowTeams = () => {
  //   const curr = !showTeams;
  //   setShowTeams(curr);
  //   localStorage.setItem('teams', curr.toString());
  // };

  const onClickItem = (e: string, i: number) => {
    if (project && documents) {
      const { id } = documents[i];
      navigate(`/projects/${project!.id}/documents/${id}`);
    }
  };

  const resize = useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing) {
        const width = mouseMoveEvent.clientX
        - sidebarRef.current!.getBoundingClientRect()?.left >= 64
          ? mouseMoveEvent.clientX - sidebarRef.current!.getBoundingClientRect()?.left
          : 64;
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

  useEffect(() => {
    if (project) {
      getUserDocuments(+project.id);
    }
  }, [project]);

  return (
    <div
      className={classNames(style.sidebar, { [style.small]: sidebarWidth < 100 })}
      ref={sidebarRef}
      style={{ width: sidebarWidth }}
    >
      <div className={classNames(style.container, style['no-select'])}>
        <Suspense>
          <Logo sidebarWidth={sidebarWidth} />
        </Suspense>
        <Search sidebarWidth={sidebarWidth} />
        <div className={style.list__container}>
          <List
            sidebarWidth={sidebarWidth}
            show={showDocuments}
            onShow={onShowDocuments}
            items={documents?.map(({ name }) => (sidebarWidth > 150 ? name : name[0])) ?? []}
            title="Документы"
            action={onClickItem}
          />
        </div>
        <div className={classNames(style.footer)}>
          <Suspense>
            <Help sidebarWidth={sidebarWidth} />
          </Suspense>
          <Suspense>
            <Profile sidebarWidth={sidebarWidth} />
          </Suspense>
        </div>
      </div>
      <div
        className={style.sidebar__resizer}
        onMouseDown={startResizing}
      />
    </div>
  );
}
