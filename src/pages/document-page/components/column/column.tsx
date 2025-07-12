/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
/* eslint-disable max-len */
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { TextInput, Button, Icon } from '@gravity-ui/uikit';
import { Minus, Plus } from '@gravity-ui/icons';
import { Controller, useForm } from 'react-hook-form';

import { useUpdateBlocksMutation } from '~/store';

import style from './column.module.css';

type FormPayload = {
  name: string;
};

export default function Column({
  children, block, addItem, removeBlock,
}: ColumnType) {
  const [updateBlock] = useUpdateBlocksMutation();
  const { control } = useForm<FormPayload>({
    defaultValues: { name: block.name ?? '' },
  });

  const onEditBlockName = async () => {
    // eslint-disable-next-line no-underscore-dangle
    const { name } = control._formValues;
    await updateBlock({ ...block, name });
  };

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'items',
    drop: () => ({ name: `block_${block.id}` }),
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
        return 'var(--g-color-base-generic)';
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
      className="column"
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <div className={style.header}>
        <Controller
          name="name"
          rules={{
            pattern: {
              value: /^[A-Za-zА-Яа-я0-9., -]{3,50}$/,
              message: 'Name is invalid',
            },
            required: true,
          }}
          control={control}
          render={({ field }) => (
            // render={({ field, fieldState }) => (
            <TextInput {...field} onBlur={onEditBlockName} className={style.title} />
          )}
        />
        <Button
          className={style.remove}
          onClick={() => removeBlock(block.id)}
          title="Удалить блок"
        >
          <Icon data={Minus} size={16} />
        </Button>
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
        <Button
          className={style.add}
          onClick={() => addItem(`block_${block.id}`)}
          title="Добавить строку"
        >
          <Icon data={Plus} size={16} />
        </Button>
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
