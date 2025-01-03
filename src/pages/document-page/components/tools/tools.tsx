import {
  IoIosAlbums, IoMdShareAlt, IoMdDownload, IoIosEye,
} from 'react-icons/io';

import style from './tools.module.css';

export default function Tools({ toggleHistory, history }
  : { toggleHistory: () => void; history: boolean; }) {
  return (
    <div className={style.tools}>
      <button
        type="button"
        className={style.button}
        title="Подписаться"
      >
        <IoIosEye />
      </button>
      <button
        type="button"
        className={style.button}
        title="Скачать"
      >
        <IoMdDownload />
      </button>
      <button
        type="button"
        className={style.button}
        title="Share"
      >
        <IoMdShareAlt />
      </button>
      <button
        type="button"
        className={style.button}
        onClick={toggleHistory}
        title={history ? 'On' : 'Off'}
      >
        <IoIosAlbums />
      </button>
    </div>
  );
}
