/* eslint-disable react/button-has-type */
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import classNames from 'classnames';
import {
  IoIosAlbums, IoIosAdd, IoMdShareAlt, IoMdDownload, IoIosEye,
} from 'react-icons/io';

import style from './document-page.module.css';

function DocumentPage() {
  const { projectId, documentId } = useParams();
  const [history, setHistory] = useState(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="layout">
        <h2 className="title">
          {`Document ${documentId} #${projectId}`}
        </h2>
        <div className={style.tools}>
          Tools
          <div>
            <button
              type="button"
              className="button"
              title="Подписаться"
            >
              <IoIosEye />
            </button>
            <button
              type="button"
              className="button"
              title="Скачать"
            >
              <IoMdDownload />
            </button>
            <button
              type="button"
              className="button"
              title="Share"
            >
              <IoMdShareAlt />
            </button>
            <button
              type="button"
              className="button"
              onClick={() => setHistory(!history)}
              title={history ? 'On' : 'Off'}
            >
              <IoIosAlbums />
            </button>
          </div>
        </div>
        <div className={classNames(style.form, { [style.two]: history })}>
          <div className={style.main}>
            <input
              className="input"
              placeholder="Name"
            />
            <div className={style.block}>
              <input
                className="input"
                placeholder="Name block"
              />
              <div className={style.items}>
                <input
                  className="input"
                  placeholder="Name item"
                />
                <input
                  className="input"
                  placeholder="Name item"
                />
                <input
                  className="input"
                  placeholder="Name item"
                />
              </div>
              <button
                type="button"
                className="button"
                title="Добавить элемент"
              >
                <IoIosAdd />
              </button>
            </div>
            <div className={style.block}>
              <input
                className="input"
                placeholder="Name block"
              />
              <div className={style.items}>
                <input
                  className="input"
                  placeholder="Name item"
                />
              </div>
            </div>
            <button
              type="button"
              className="button"
              title="Добавить блок"
            >
              <IoIosAdd />
            </button>
          </div>
          {history && (
            <div className={style.history}>
              <h3 className={style.title}>History</h3>
              <ul className={style.list}>
                <li className={style.item}>item 1</li>
                <li className={style.item}>item 2</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
}

export default DocumentPage;
