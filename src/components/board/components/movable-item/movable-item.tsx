/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Button, Icon } from '@gravity-ui/uikit';
import { Minus, Pencil } from '@gravity-ui/icons';

import RainRunoff from '../../../rain-runoff/rain-runoff';

import style from './movable-item.module.css';
import { useAppSelector } from '~/hooks';
import {
  blockSelector,
  useChangeItemColumnMutation,
  useDeleteItemMutation,
  useRefreshItemMutation,
} from '~/store';

export default function MovableItem({ item, index }: MovableItemType) {
  const [deleteRainRunoffItem] = useDeleteItemMutation();
  const [changeItemBlock] = useChangeItemColumnMutation();
  const [refreshItem] = useRefreshItemMutation();
  const { items } = useAppSelector(blockSelector);
  const [popupForm, setPopupForm] = useState<number | null>(null);

  const changeItemColumn = async (currentItem: ItemType, columnName: string) => {
    await changeItemBlock({ id: currentItem.id, column: columnName });
  };

  const moveCardHandler = async (dragIndex: number, hoverIndex: number, { id }: ItemType) => {
    const dragItem = items.find((x: ItemType) => x.id === id);
    dragIndex = items.findIndex((x: ItemType) => x.id === id);

    if (dragItem) {
      const newItems = [...items];
      const [movedItem] = newItems.splice(dragIndex, 1);
      newItems.splice(hoverIndex, 0, movedItem);
      await refreshItem(newItems.map((x, i) => ({ ...x, index: i })));
    }
  };

  const handleClose = () => setPopupForm(null);
  const editItem = (id: number) => setPopupForm(id);
  const removeItem = async (id: number) => {
    await deleteRainRunoffItem(id);
  };

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
      index, name: item.name, currentColumnName: item.column, id: item.id,
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
      <RainRunoff
        item={item}
        popupForm={popupForm}
        handleClose={handleClose}
      />
      <div className={style.tools}>
        <Button
          className={style.edit}
          onClick={() => editItem(item.id)}
          title="Редактировать строку"
        >
          <Icon data={Pencil} size={16} />
        </Button>
        <Button
          className={style.remove}
          onClick={() => removeItem(item.id)}
          title="Удалить строку"
        >
          <Icon data={Minus} size={16} />
        </Button>
      </div>
    </div>
  );
}
