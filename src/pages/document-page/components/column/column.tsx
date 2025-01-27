/* eslint-disable max-len */
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { IoIosAdd, IoIosRemove } from 'react-icons/io';

import style from './column.module.css';

export default function Column({
  children, title, addItem, removeBlock,
}: ColumnType) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'items',
    drop: () => ({ name: title }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    canDrop: (item) => {
      const { currentColumnName } = item as { currentColumnName: string; };

      return (currentColumnName.split('_')[0] === 'block');
    },
  });
  // eslint-disable-next-line consistent-return
  const getBackgroundColor = () => {
    if (isOver) {
      if (canDrop) {
        return 'rgb(188,251,255)';
      } if (!canDrop) {
        return 'rgb(255,188,188)';
      }
    } else {
      return '';
    }
  };

  // const initValues = {

  //   flow: 0.224,
  //   place: 1,

  //   condition: 0,
  // };

  return (
    <div
      ref={drop}
      className="column"
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <div className={style.header}>
        <input
          className={style.title}
          value={title}
          onChange={(e) => console.log(e)}
        />
        <button
          className={style.remove}
          type="button"
          onClick={() => removeBlock(title)}
          title="Удалить блок"
        >
          <IoIosRemove />
        </button>
      </div>
      <div className="movable-item">
        <ul className={style.fields}>
          <li className={style.position}>#</li>
          {[
            's1', // roof
            's2', // pavements
            's3', // tracks
            's4', // ground
            's5', // cobblestone
            's6', // stone
            's7', // lawns
            '*',
            'place',
            'q, л/с', // intensity
            'condition', // condition
            't, мин', // timeInit
            'l, трубы', // lengthPipe
            'l, лотка', // lengthTray
            'v1, трубы', // velocityPipe
            'v2, лотка', // velocityTray
          ].map((x) => (<li key={uuidv4()} className={style.field}>{x}</li>))}
        </ul>
        <button
          className={style.add}
          type="button"
          onClick={() => addItem(title)}
          title="Добавить строку"
        >
          <IoIosAdd />
        </button>
      </div>
      {children}
      <div className="movable-item">
        <ul className={style['footer-fields']}>
          <li className={style.position} />
          {Array.from({ length: 16 }, (_, i) => i).map(() => (<li key={uuidv4()} className={style.field}>-</li>))}
        </ul>
      </div>
    </div>
  );
}
