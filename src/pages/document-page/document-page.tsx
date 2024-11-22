import { useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import style from './document-page.module.css';

function DocumentPage() {
  const { projectId, documentId } = useParams();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="layout">
        <h2 className="title">
          {`Document ${documentId} #${projectId}`}
        </h2>
        <div className={style.tools}>Tools</div>
        <div className={style.form}>
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
          <div className={style.history}>
            History
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default DocumentPage;
