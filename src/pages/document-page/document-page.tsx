/* eslint-disable react/jsx-key */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';

import { v4 as uuidv4 } from 'uuid';
import { HTML5Backend } from 'react-dnd-html5-backend';
import classNames from 'classnames';
import {
  IoIosAlbums, IoIosAdd, IoMdShareAlt, IoMdDownload, IoIosEye,
} from 'react-icons/io';

import Block from './components/block/block.tsx';
import History from './components/history/history.tsx';

import style from './document-page.module.css';
import '.app.css';

const tasks = [{ id: 1, name: 'Item 1', column: 'block_1' }];
const initBlocks = ['block_1', 'block_2', 'block_3'];

export default function DocumentPage() {
  const { projectId, documentId } = useParams();
  const [history, setHistory] = useState(false);
  const [items, setItems] = useState(tasks);
  const [blocks, setBlocks] = useState(initBlocks);

  const addItem = () => {
    setItems([...items, { id: items.length + 1, name: `Item ${items.length + 1}`, column: 'block_1' }]);
  };

  const returnBlocksForColumn = () => blocks.map((item, index) => (
    <Block
      key={uuidv4()}
      item={item}
      index={index}
      setBlocks={setBlocks}
      addItem={addItem}
      blocks={blocks}
      items={items}
      setItems={setItems}
    />
  ));

  return (
    <div className="layout">
      <h2 className="title">{`Document ${documentId} #${projectId}`}</h2>
      <div className={style.tools}>
        Tools
        <div className={style.btools}>
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
            {returnBlocksForColumn()}
            <div className={style.buttons}>
              <button className={style.add} type="button">
                <IoIosAdd />
              </button>
            </div>
          </DndProvider>
        </div>
        {history && (<History />)}
      </div>
    </div>
  );
}
