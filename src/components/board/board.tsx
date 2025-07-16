/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { v4 as uuidv4 } from 'uuid';

import { Button, Icon } from '@gravity-ui/uikit';
import { Plus } from '@gravity-ui/icons';

import Block from './components/block/block';

import { useAppSelector } from '~/hooks';
import {
  useCreateBlockMutation,
  useGetDocumentBlocksMutation,
  blockSelector,
  useGetDocumentMutation,
} from '~/store';

import style from './board.module.css';
import '.app.css';

export default function Board() {
  const [createBlock] = useCreateBlockMutation();
  const [getBlocks] = useGetDocumentBlocksMutation();
  const [getDocument] = useGetDocumentMutation();
  const { blocks } = useAppSelector(blockSelector);
  const { projectId, documentId } = useParams();

  const addBlock = () => {
    createBlock({ name: `block_${blocks.length + 1}`, index: blocks.length + 1, document: { id: documentId! } });
  };

  const returnBlocksForColumn = () => blocks.map((block, index) => (
    <Block
      key={uuidv4()}
      block={block}
      index={index}
    />
  ));

  useEffect(() => {
    if (documentId) {
      getBlocks(+documentId);
      getDocument(+documentId);
    }
  }, [documentId, projectId]);

  return (
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
  );
}
