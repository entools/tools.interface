/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import classNames from 'classnames';
import {
  IoIosAlbums, IoIosAdd, IoMdShareAlt, IoMdDownload, IoIosEye,
} from 'react-icons/io';

import Column from './components/column/column.tsx';
import MovableItem from './components/movable-item/movable-item.tsx';
import { COLUMN_NAMES } from './components/index.ts';

import style from './document-page.module.css';
import '.app.css';

const tasks = [
  { id: 1, name: 'Item 1', column: 'Do it' },
  { id: 2, name: 'Item 2', column: 'Do it' },
  { id: 3, name: 'Item 3', column: 'Do it' },
  { id: 4, name: 'Item 4', column: 'Do it' },
];

export default function DocumentPage() {
  const { projectId, documentId } = useParams();
  const [history, setHistory] = useState(false);
  const [items, setItems] = useState(tasks);

  const addItem = () => {
    setItems([...items, { id: items.length + 1, name: `Item ${items.length + 1}`, column: 'Do it' }]);
  };

  const moveCardHandler = (dragIndex: any, hoverIndex: any) => {
    const dragItem = items[dragIndex];

    if (dragItem) {
      setItems((prevState) => {
        const coppiedStateArray = [...prevState];
        // remove item by "hoverIndex" and put "dragItem" instead
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);
        // remove item by "dragIndex" and put "prevItem" instead
        coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

        return coppiedStateArray;
      });
    }
  };

  const returnItemsForColumn = (columnName: any) => items
    .filter((item) => item.column === columnName)
    .map((item, index) => (
      <MovableItem
        key={item.id}
        name={item.name}
        currentColumnName={item.column}
        setItems={setItems}
        index={index}
        moveCardHandler={moveCardHandler}
      />
    ));

  const {
    DO_IT, IN_PROGRESS, AWAITING_REVIEW, DONE,
  } = COLUMN_NAMES;

  return (
    <div className="layout">
      <h2 className="title">{`Document ${documentId} #${projectId}`}</h2>
      <div className={style.tools}>
        Tools
        <div>
          <button
            type="button"
            className={classNames('button', style.button)}
            title="Подписаться"
          >
            <IoIosEye />
          </button>
          <button
            type="button"
            className={classNames('button', style.button)}
            title="Скачать"
          >
            <IoMdDownload />
          </button>
          <button
            type="button"
            className={classNames('button', style.button)}
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
        <div className="container">
          <DndProvider backend={HTML5Backend}>
            <Column
              title={DO_IT}
              className="column do-it-column"
              addItem={addItem}
            >
              {returnItemsForColumn(DO_IT)}
            </Column>
            <Column title={IN_PROGRESS} className="column in-progress-column">
              {returnItemsForColumn(IN_PROGRESS)}
            </Column>
            <Column
              title={AWAITING_REVIEW}
              className="column awaiting-review-column"
            >
              {returnItemsForColumn(AWAITING_REVIEW)}
            </Column>
            <Column title={DONE} className="column done-column">
              {returnItemsForColumn(DONE)}
            </Column>
            <IoIosAdd />
          </DndProvider>
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
  );
}
