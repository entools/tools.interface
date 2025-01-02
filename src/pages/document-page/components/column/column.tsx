/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDrop } from 'react-dnd';
import { IoIosAdd, IoIosRemove } from 'react-icons/io';
// import { COLUMN_NAMES } from '../index.ts';

import style from './column.module.css';

export default function Column({
  children, className, title, addItem,
}: any) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'items',
    drop: () => ({ name: title }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    // Override monitor.canDrop() function
    canDrop: (item) => {
      // const { DO_IT, IN_PROGRESS } = COLUMN_NAMES;
      const { currentColumnName } = item as any;
      // console.log(item);

      return (
        currentColumnName.split('_')[0] === 'block'
        // currentColumnName === title
        // || (currentColumnName === DO_IT && title === IN_PROGRESS)
        // || (currentColumnName === IN_PROGRESS
        // )
      );
    },
  });

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

  return (
    <div
      ref={drop}
      className={className}
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <div className={style.header}>
        <input className={style.title} value={title} onChange={(e) => console.log(e)} />
        <button className={style.remove} type="button">
          <IoIosRemove />
        </button>
      </div>

      {children}
      <button className={style.add} type="button" onClick={addItem}>
        <IoIosAdd />
      </button>
    </div>
  );
}
