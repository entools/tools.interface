import { Button, Icon } from '@gravity-ui/uikit';
import { useNavigate } from 'react-router';
import {
  Eye, ArrowDownToLine, ArrowShapeTurnUpRight, ClockArrowRotateLeft, TrashBin,
} from '@gravity-ui/icons';

import style from './tools.module.css';
import { useDeleteDocumentMutation } from '~/store';

export default function Tools({
  toggleHistory, history, documentId, projectId,
}
  : { toggleHistory: () => void; history: boolean; documentId: string; projectId: string }) {
  const [deleteDocument] = useDeleteDocumentMutation();
  const navigate = useNavigate();
  const onClickDeleteDocument = async () => {
    await deleteDocument(+documentId!);
    navigate(`/projects/${projectId}`);
  };

  return (
    <div className={style.tools}>
      <Button
        className={style.button}
        title="Удалить"
        onClick={onClickDeleteDocument}
      >
        <Icon data={TrashBin} size={16} />
      </Button>
      <Button
        className={style.button}
        title="Подписаться"
      >
        <Icon data={Eye} size={16} />
      </Button>
      <Button
        className={style.button}
        title="Скачать"
      >
        <Icon data={ArrowDownToLine} size={16} />
      </Button>
      <Button
        className={style.button}
        title="Share"
      >
        <Icon data={ArrowShapeTurnUpRight} size={16} />
      </Button>
      <Button
        className={style.button}
        onClick={toggleHistory}
        title={history ? 'On' : 'Off'}
      >
        <Icon data={ClockArrowRotateLeft} size={16} />
      </Button>
    </div>
  );
}
