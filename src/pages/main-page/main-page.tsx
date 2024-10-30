/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  useCallback, useEffect, useRef, useState,
} from 'react';

import reactLogo from '../../assets/react.svg';

import style from './main-page.module.css';

function MainPage() {
  const sidebarRef = useRef<HTMLInputElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(310);
  const [count, setCount] = useState(0);

  const startResizing = useCallback((mouseDownEvent: React.MouseEvent) => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

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
    <div className={style.container}>
      {/* <div className={style.header}>
        <button type="button">
          tools
        </button>
        header
        <div className={style.menu}>
          <button type="button">
            profile
          </button>
          <button type="button">
            ?
          </button>
        </div>
      </div> */}
      <div
        className={style.sidebar}
        ref={sidebarRef}
        style={{ width: sidebarWidth }}
      >
        <div className={style.sidebar__title}>
          sidebar
        </div>
        {/* <button type="button">
          +
        </button> */}

      </div>
      <div
        className={style.sidebar__resizer}
        onMouseDown={startResizing}
      />
      <div className={style.board}>
        <div className={style.desk}>

          {/* <div>
            <a href="https://react.dev" target="_blank" rel="noreferrer">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
          <div className="card">
            <button type="button" onClick={() => setCount((cnt) => cnt + 1)}>
              count is
              {' '}
              {count}
            </button>
            <p>
              Edit
              {' '}
              <code>src/App.tsx</code>
              {' '}
              and save to test HMR
            </p>
          </div> */}
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </div>
      </div>
      {/* <div className={style.header}>
        footer
      </div> */}
    </div>
  );
}

export default MainPage;
