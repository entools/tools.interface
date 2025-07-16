import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

import RainWaterForm from '../rain-water-form/rain-water-form';
import Modal from '../modal/modal';

import style from './rain-runoff.module.css';

export default function RainRunoff({ item, popupForm, handleClose }: TemplateType) {
  const initValues = {
    roof: '0.31',
    pavements: '0.09',
    tracks: '0.125',
    ground: '0.064',
    cobblestone: '0.145',
    stone: '0',
    lawns: '0.38',
    flow: '0.224',
    place: '1',
    intensity: '80',
    condition: '0',
    // koef: 0.65,
    timeInit: '5',
    lengthPipe: '350',
    lengthTray: '50',
    velocityPipe: '0.8',
    velocityTray: '0.7',
  };
  const [values, setValues] = useState<Record<string, string>>(initValues);

  return (
    <>
      <ul className={style.fields}>
        <li className={style.position}>{item.id}</li>
        {Object.values(values).map((x) => (<li key={uuidv4()} className={style.field}>{x}</li>))}
      </ul>
      {popupForm && (
      <Modal
        title="Rain Water"
        onClose={handleClose}
      >
        <RainWaterForm data={values} setData={setValues} onClose={handleClose} />
      </Modal>
      )}
    </>
  );
}
