/* eslint-disable consistent-return */
import { useDrop } from 'react-dnd';
import { IoIosAdd, IoIosRemove } from 'react-icons/io';

import style from './column.module.css';

export default function Column({
  children, className, title, addItem, removeBlock,
}: ColumnType) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'items',
    drop: () => ({ name: title }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    // Override monitor.canDrop() function
    canDrop: (item) => {
      const { currentColumnName } = item as { currentColumnName: string; };

      return (currentColumnName.split('_')[0] === 'block');
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
      {children}
      <button
        className={style.add}
        type="button"
        onClick={() => addItem(title)}
        title="Добавить строку"
      >
        <IoIosAdd />
      </button>
    </div>
  );
}
