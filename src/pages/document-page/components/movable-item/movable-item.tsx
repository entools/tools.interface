/* eslint-disable max-len */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-children-prop */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { IoIosRemove, IoMdCreate } from 'react-icons/io';
import { v4 as uuidv4 } from 'uuid';

import RainWaterForm from '../form/rain-water.tsx';
import Modal from '../../../../components/modal/modal.tsx';

import style from './movable-item.module.css';

export default function MovableItem({
  name,
  index,
  currentColumnName,
  items,
  setItems,
  id,
}: MovableItemType) {
  const [popupForm, setPopupForm] = useState<number | null>(null);
  const changeItemColumn = (currentItem: ItemType, columnName: string) => {
    setItems((prevState: ItemType[]) => prevState.map((e: ItemType) => ({
      ...e,
      column: e.name === currentItem.name ? columnName : e.column,
    })));
  };

  const moveCardHandler = (dragIndex: number, hoverIndex: number, item: ItemType) => {
    // const dragItem = items[dragIndex];
    const dragItem = items.find((x: ItemType) => x.id === item.id);
    dragIndex = items.findIndex((x: ItemType) => x.id === item.id);

    if (dragItem) {
      setItems((prevState: ItemType[]) => {
        const coppiedStateArray = [...prevState];
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);
        coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

        return coppiedStateArray;
      });
    }
  };
  const editItem = (id: number) => setPopupForm(id);
  const handleClose = () => setPopupForm(null);
  const removeItem = (id: number) => setItems(items.filter((x: ItemType) => x.id !== id));

  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: 'items',
    hover(item: ItemType, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index!;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      // @ts-ignore
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset()!;
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
      index, name, currentColumnName, id,
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (dropResult) {
        const { name } = dropResult as { name: string };

        if (name && name.split('_')[0] === 'block') {
          changeItemColumn(item as unknown as ItemType, name);
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
      <ul className={style.fields}>
        {Array.from({ length: 5 }, (_, i) => i).map((x) => (<li key={uuidv4()} className={style.field}>{x}</li>))}
      </ul>
      <div className={style.tools}>
        <button
          className={style.edit}
          type="button"
          onClick={() => editItem(id)}
          title="Редактировать строку"
        >
          <IoMdCreate />
        </button>
        <button
          className={style.remove}
          type="button"
          onClick={() => removeItem(id)}
          title="Удалить строку"
        >
          <IoIosRemove />
        </button>
      </div>
      {popupForm && <Modal title="Rain Water" onClose={handleClose} children={(<RainWaterForm />)} />}
    </div>
  );
}
