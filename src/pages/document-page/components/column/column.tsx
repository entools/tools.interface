/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDrop } from 'react-dnd';
import { IoIosAdd } from 'react-icons/io';
import { COLUMN_NAMES } from '../index.ts';

export default function Column({
  children, className, title, addItem,
}: any) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'Our first type',
    drop: () => ({ name: title }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    // Override monitor.canDrop() function
    canDrop: (item) => {
      const {
        DO_IT, IN_PROGRESS, AWAITING_REVIEW, DONE,
      } = COLUMN_NAMES;
      const { currentColumnName } = item as any;
      return (
        currentColumnName === title
        || (currentColumnName === DO_IT && title === IN_PROGRESS)
        || (currentColumnName === IN_PROGRESS
          && (title === DO_IT || title === AWAITING_REVIEW))
        || (currentColumnName === AWAITING_REVIEW
          && (title === IN_PROGRESS || title === DONE))
        || (currentColumnName === DONE && title === AWAITING_REVIEW)
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
      <input value={title} onChange={(e) => console.log(e)} />
      <button type="button" onClick={addItem}>
        <IoIosAdd />
      </button>

      {children}
    </div>
  );
}
