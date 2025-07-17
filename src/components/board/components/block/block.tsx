import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router';

import Column from '../column/column';
import MovableItem from '../movable-item/movable-item';

import { blockSelector, useRefreshBlocksMutation } from '~/store';
import { useAppSelector } from '~/hooks';

export default function Block({ index, block }: BlockType) {
  const { documentId } = useParams();
  const ref = useRef(null);
  const { blocks, items } = useAppSelector(blockSelector);
  const [refreshBlocks] = useRefreshBlocksMutation();
  const moveBlockHandler = async (dragIndex: number, hoverIndex: number) => {
    const dragItem = blocks[dragIndex];

    if (dragItem) {
      const coppiedStateArray = [...blocks];
      const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);
      coppiedStateArray.splice(dragIndex, 1, prevItem[0]);
      await refreshBlocks({
        id: +documentId!,
        data: coppiedStateArray.map((item, i) => ({ ...item, index: i })),
      });
    }
  };

  const [, drop] = useDrop({
    accept: 'blocks',
    hover(itm: { index: number }, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = itm.index!;
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

      moveBlockHandler(dragIndex, hoverIndex);
      // eslint-disable-next-line no-param-reassign
      itm.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'blocks',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const returnItemsForColumn = (columnName: string) => items
    .filter((item: ItemType) => item.column === columnName)
    .map((item: ItemType, idx: number) => (
      <MovableItem
        key={uuidv4()}
        index={idx}
        item={item}
      />
    ));

  const opacity = isDragging ? 0.4 : 1;
  const border = isDragging ? 'solid 1px var(--table-cell)' : 'none';

  drag(drop(ref));
  return (
    <div
      ref={ref}
      style={{ opacity, border, borderRadius: '8px' }}
    >
      <Column block={block}>
        {returnItemsForColumn(`block_${block.id}`)}
      </Column>
    </div>
  );
}
