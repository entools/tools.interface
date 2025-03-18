import { useState } from 'react';
import { NavLink } from 'react-router';

import reactLogo from '../../assets/react.svg';

import style from './board.module.css';

export default function Board() {
  const [count, setCount] = useState(0);

  return (
    <div className={style.board}>
      <div className={style.header}>
        header
        <div className={style.menu}>
          <NavLink to="/about" className={style.link}>
            ?
          </NavLink>
        </div>
      </div>
      <div className={style.desk}>

        <div>
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
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  );
}
