/* eslint-disable react/jsx-props-no-spreading */
import { useDrop } from 'react-dnd';
import { TextInput, Button, Icon } from '@gravity-ui/uikit';
import { Minus, Plus } from '@gravity-ui/icons';
import { Controller, useForm } from 'react-hook-form';

import {
  blockSelector,
  useCreateItemMutation, useRemoveBlockMutation, useUpdateBlocksMutation,
} from '~/store';
import { useAppSelector } from '~/hooks';

import RainRunoffHeader from './rain-runoff-header';
import RainRunoffFooter from './rain-runoff-footer';

import style from './column.module.css';

type FormPayload = { name: string };

export default function Column({ children, block }: ColumnType) {
  const [createItem] = useCreateItemMutation();
  const [removeBlock] = useRemoveBlockMutation();
  const [updateBlock] = useUpdateBlocksMutation();
  const { items } = useAppSelector(blockSelector);
  const { control } = useForm<FormPayload>({
    defaultValues: { name: block.name ?? '' },
  });

  const addItem = async (blockId: string) => {
    await createItem({
      name: `Item_${items.length + 1}`,
      block: { id: +blockId.split('_')[1] },
      index: items.length + 1,
      rainRunoff: {
        id: 0,
        roof: '0',
        pavements: '0',
        tracks: '0',
        ground: '0',
        cobblestone: '0',
        stone: '0',
        lawns: '0',
        place: '0',
        intensity: '0',
        condition: '0',
        timeInit: '0',
        lengthPipe: '0',
        lengthTray: '0',
        velocityPipe: '0',
        velocityTray: '0',
        flow: '0',
      },
    });
  };

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
        return 'var(--table-cell)';
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
        <RainRunoffHeader />
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
        <RainRunoffFooter block={block.id} />
      </div>
    </div>
  );
}
