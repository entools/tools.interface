/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames';
import { TextInput } from '@gravity-ui/uikit';

import Board from '../../components/board/board';
import History from './components/history/history';
import Tools from './components/tools/tools';

import { useAppSelector } from '~/hooks';
import {
  useGetDocumentBlocksMutation,
  useGetDocumentMutation,
  documentSelector,
  useUpdateDocumentMutation,
} from '~/store';

import style from './document-page.module.css';

type FormPayload = { name: string };

export default function DocumentPage() {
  const [getBlocks] = useGetDocumentBlocksMutation();
  const [getDocument] = useGetDocumentMutation();
  const [updateDocument] = useUpdateDocumentMutation();

  const document = useAppSelector(documentSelector);
  const { projectId, documentId } = useParams();
  const [history, setHistory] = useState(false);
  const toggleHistory = () => setHistory(!history);

  const onEditDocumentName = async () => {
    if (document) {
      // eslint-disable-next-line no-use-before-define, no-underscore-dangle
      const { name } = control._formValues;
      await updateDocument({ ...document, name });
    }
  };

  const { control, reset } = useForm<FormPayload>({
    defaultValues: { name: document?.name ?? '' },
  });

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
            <TextInput {...field} onBlur={onEditDocumentName} />
          )}
        />
        <Tools
          toggleHistory={toggleHistory}
          history={history}
          documentId={documentId!}
          projectId={projectId!}
        />
      </div>
      <div className={classNames(style.form, { [style.two]: history })}>
        <div className="container">
          <Board />
        </div>
        {history && (<History />)}
      </div>
    </div>
  );
}
