import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import classNames from 'classnames';

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
          <button
            type="button"
            className="button"
            onClick={() => setHistory(!history)}
          >
            {history ? 'On' : 'Off'}
          </button>
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
          </div>
          {history && (
            <div className={style.history}>
              History
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
}

export default DocumentPage;
