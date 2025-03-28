/* eslint-disable no-console */
import { useState } from 'react';
import { useParams } from 'react-router';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import { TextInput, Button, Icon } from '@gravity-ui/uikit';
import { Plus } from '@gravity-ui/icons';

import Block from './components/block/block';
import History from './components/history/history';
import Tools from './components/tools/tools';

import style from './document-page.module.css';
import '.app.css';

const tasks = [{ id: 1, name: 'Item 1', column: 'block_1' }];
const initBlocks = ['block_1', 'block_2', 'block_3'];

export default function DocumentPage() {
  const { projectId, documentId } = useParams();
  const [history, setHistory] = useState(false);
  const [items, setItems] = useState(tasks);
  const [blocks, setBlocks] = useState(initBlocks);
  const addBlock = () => setBlocks([...blocks, `block_${blocks.length + 1}`]);
  const toggleHistory = () => setHistory(!history);

  const returnBlocksForColumn = () => blocks.map((block, index) => (
    <Block
      key={uuidv4()}
      block={block}
      index={index}
      setBlocks={setBlocks}
      blocks={blocks}
      items={items}
      setItems={setItems}
    />
  ));

  return (
    <div className="layout">
      <div className={style.tools}>
        <TextInput
          size="m"
          value={`Document ${documentId} #${projectId}`}
          onChange={(e) => console.log(e)}
        />
        <Tools toggleHistory={toggleHistory} history={history} />
      </div>
      <div className={classNames(style.form, { [style.two]: history })}>
        <div className="container">
          <DndProvider backend={HTML5Backend}>
            {returnBlocksForColumn()}
            <div className={style.buttons}>
              <Button
                title="Добавить блок"
                view="action"
                size="s"
                onClick={addBlock}
              >
                <Icon data={Plus} size={16} />
                Добавить блок
              </Button>
            </div>
          </DndProvider>
        </div>
        {history && (<History />)}
      </div>
    </div>
  );
}
