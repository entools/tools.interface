/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import { TextInput, Button, Icon } from '@gravity-ui/uikit';
import { Plus } from '@gravity-ui/icons';

import { Controller, useForm } from 'react-hook-form';
import Block from './components/block/block';
import History from './components/history/history';
import Tools from './components/tools/tools';

import { useAppSelector, useAppDispatch } from '~/hooks';
import {
  useCreateBlockMutation,
  useGetDocumentBlocksMutation,
  blockSelector,
  useGetDocumentMutation,
  documentSelector,
  useUpdateDocumentMutation,
  useRemoveBlockMutation,
  BlockType,
  setBlocks,
  useRefreshBlocksMutation,
} from '~/store';

import style from './document-page.module.css';
import '.app.css';

type FormPayload = {
  name: string;
};

const tasks = [{ id: 1, name: 'Item 1', column: 'block_24' }];

export default function DocumentPage() {
  const dispatch = useAppDispatch();
  const [createBlock] = useCreateBlockMutation();
  const [getBlocks] = useGetDocumentBlocksMutation();
  const [getDocument] = useGetDocumentMutation();
  const [updateDocument] = useUpdateDocumentMutation();
  const [removeBlock] = useRemoveBlockMutation();
  const [refreshBlocks] = useRefreshBlocksMutation();

  const blocks = useAppSelector(blockSelector);
  const document = useAppSelector(documentSelector);

  const { projectId, documentId } = useParams();
  const [history, setHistory] = useState(false);
  const [items, setItems] = useState(tasks);

  const setData = async (array: BlockType[]) => {
    await refreshBlocks({ id: +documentId!, data: array });
    dispatch(setBlocks(array));
  };

  const onEditDocumentName = async () => {
    if (document) {
      // eslint-disable-next-line no-use-before-define, no-underscore-dangle
      const { name } = control._formValues;
      await updateDocument({ ...document, name });
    }
  };

  const { control, reset } = useForm<FormPayload>({
    defaultValues: {
      name: document?.name ?? '',
    },
  });

  const addBlock = () => {
    if (documentId) {
      createBlock({ name: `block_${blocks.length + 1}`, index: blocks.length + 1, document: { id: documentId } });
    }
  };
  const deleteBlock = async (id: number) => {
    await removeBlock(id);
  };

  const toggleHistory = () => setHistory(!history);

  const returnBlocksForColumn = () => blocks.map((block, index) => (
    <Block
      key={uuidv4()}
      block={block}
      index={index}
      setBlocks={setData}
      blocks={blocks}
      items={items}
      setItems={setItems}
      removeBlock={deleteBlock}
    />
  ));

  useEffect(() => {
    if (documentId) {
      getBlocks(+documentId);
      getDocument(+documentId);
    }
  }, [documentId, projectId]);

  useEffect(() => {
    reset({ name: document?.name });
  }, [document?.name]);

  return (
    <div className="layout">
      <div className={style.tools}>
        <Controller
          name="name"
          rules={{
            pattern: {
              value: /^[A-Za-zА-Яа-я0-9., -]{3,50}$/,
              message: 'Name is invalid',
            },
            required: true,
          }}
          control={control}
          render={({ field }) => (
          // render={({ field, fieldState }) => (
            <TextInput {...field} onBlur={onEditDocumentName} />
          )}
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
