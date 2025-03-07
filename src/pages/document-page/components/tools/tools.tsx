import { Button, Icon } from '@gravity-ui/uikit';
import {
  Eye, ArrowDownToLine, ArrowShapeTurnUpRight, ClockArrowRotateLeft,
} from '@gravity-ui/icons';

import style from './tools.module.css';

export default function Tools({ toggleHistory, history }
  : { toggleHistory: () => void; history: boolean; }) {
  return (
    <div className={style.tools}>
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
