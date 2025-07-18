import { v4 as uuidv4 } from 'uuid';

import RainWaterForm from '../rain-water-form/rain-water-form';
import Modal from '../modal/modal';

import style from './rain-runoff.module.css';

const fields: (keyof RainRunoffType)[] = [
  'roof',
  'pavements',
  'tracks',
  'ground',
  'cobblestone',
  'stone',
  'lawns',
  'place',
  'intensity',
  'condition',
  'timeInit',
  'lengthPipe',
  'lengthTray',
  'velocityPipe',
  'velocityTray',
  'flow',
];

export default function RainRunoff({ item, popupForm, handleClose }: TemplateType) {
  return (
    <>
      <ul className={style.fields}>
        <li className={style.position}>{item.id}</li>
        {fields.map((x) => (<li key={uuidv4()} className={style.field}>{item.rainRunoff[x]}</li>))}
      </ul>
      {popupForm && (
      <Modal
        title="Rain Water"
        onClose={handleClose}
      >
        <RainWaterForm
          item={item}
          onClose={handleClose}
        />
      </Modal>
      )}
    </>
  );
}
