/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { COLUMN_NAMES } from '../index.ts';

export default function MovableItem({
  name,
  index,
  currentColumnName,
  moveCardHandler,
  setItems,
}: any) {
  const changeItemColumn = (currentItem: any, columnName: any) => {
    setItems((prevState: any) => prevState.map((e: any) => ({
      ...e,
      column: e.name === currentItem.name ? columnName : e.column,
    })));
  };

  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: 'Our first type',
    hover(item: any, monitor: any) {
      if (!ref.current) {
        return;
      }
      // @ts-ignore
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      // @ts-ignore
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCardHandler(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'Our first type',
    item: {
      index, name, currentColumnName, // type: 'Our first type',
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (dropResult) {
        const { name } = dropResult as any;
        const {
          DO_IT, IN_PROGRESS, AWAITING_REVIEW, DONE,
        } = COLUMN_NAMES;
        switch (name) {
          case IN_PROGRESS:
            changeItemColumn(item, IN_PROGRESS);
            break;
          case AWAITING_REVIEW:
            changeItemColumn(item, AWAITING_REVIEW);
            break;
          case DONE:
            changeItemColumn(item, DONE);
            break;
          case DO_IT:
            changeItemColumn(item, DO_IT);
            break;
          default:
            break;
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  drag(drop(ref));

  return (
    <div ref={ref} className="movable-item" style={{ opacity }}>
      {name}
    </div>
  );
}
