/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { IoIosRemove } from 'react-icons/io';

import style from './movable-item.module.css';

export default function MovableItem({
  name,
  index,
  currentColumnName,
  items,
  setItems,
  id,
}: any) {
  const changeItemColumn = (currentItem: any, columnName: any) => {
    setItems((prevState: any) => prevState.map((e: any) => ({
      ...e,
      column: e.name === currentItem.name ? columnName : e.column,
    })));
  };

  const moveCardHandler = (dragIndex: any, hoverIndex: any, item: any) => {
    // const dragItem = items[dragIndex];
    const dragItem = items.find((x: any) => x.id === item.id);
    dragIndex = items.findIndex((x: any) => x.id === item.id);

    if (dragItem) {
      setItems((prevState: any) => {
        const coppiedStateArray = [...prevState];
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);
        coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

        return coppiedStateArray;
      });
    }
  };
  const removeItem = (id: number) => setItems(items.filter((x: any) => x.id !== id));

  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: 'items',
    hover(item: any, monitor: any) {
      if (!ref.current) {
        return;
      }

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

      moveCardHandler(dragIndex, hoverIndex, item);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'items',
    item: {
      index, name, currentColumnName, id, // type: 'Our first type',
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (dropResult) {
        const { name } = dropResult as any;

        if (name && name.split('_')[0] === 'block') {
          changeItemColumn(item, name);
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
      <input className={style.name} value={name} onChange={(e) => console.log(e)} />
      <button className={style.remove} type="button" onClick={() => removeItem(id)}>
        <IoIosRemove />
      </button>
    </div>
  );
}
