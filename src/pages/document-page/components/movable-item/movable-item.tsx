/* eslint-disable react/no-children-prop */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Button, Icon } from '@gravity-ui/uikit';
import { Minus, Pencil } from '@gravity-ui/icons';
import { v4 as uuidv4 } from 'uuid';

import RainWaterForm from '../form/rain-water';
import Modal from '../../../../components/modal/modal';

import style from './movable-item.module.css';
import { useAppDispatch, useAppSelector } from '~/hooks';
import {
  blockSelector, changeColumn, moveItem,
  useDeleteRainRunoffItemMutation,
} from '~/store';

export default function MovableItem({
  name,
  index,
  currentColumnName,
  id,
}: MovableItemType) {
  const dispatch = useAppDispatch();
  const [deleteRainRunoffItem] = useDeleteRainRunoffItemMutation();
  const { items } = useAppSelector(blockSelector);
  const [popupForm, setPopupForm] = useState<number | null>(null);

  const changeItemColumn = (currentItem: ItemType, columnName: string) => {
    dispatch(changeColumn({ id: currentItem.id, column: columnName }));
  };

  const moveCardHandler = (dragIndex: number, hoverIndex: number, item: ItemType) => {
    const dragItem = items.find((x: ItemType) => x.id === item.id);
    dragIndex = items.findIndex((x: ItemType) => x.id === item.id);

    if (dragItem) {
      dispatch(moveItem({ dragIndex, hoverIndex }));
    }
  };

  const editItem = (id: number) => setPopupForm(id);
  const handleClose = () => setPopupForm(null);

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
    <div ref={ref} className="movable-item" style={{ opacity }}>
      <ul className={style.fields}>
        <li className={style.position}>{id}</li>
        {Object.values(values).map((x) => (<li key={uuidv4()} className={style.field}>{x}</li>))}
      </ul>
      <div className={style.tools}>
        <Button
          className={style.edit}
          onClick={() => editItem(id)}
          title="Редактировать строку"
        >
          <Icon data={Pencil} size={16} />
        </Button>
        <Button
          className={style.remove}
          onClick={() => removeItem(id)}
          title="Удалить строку"
        >
          <Icon data={Minus} size={16} />
        </Button>
      </div>
      {popupForm && (
        <Modal
          title="Rain Water"
          onClose={handleClose}
          children={(<RainWaterForm data={values} setData={setValues} onClose={handleClose} />)}
        />
      )}
    </div>
  );
}
