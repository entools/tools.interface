/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import classNames from 'classnames';

import Column from '../column/column.tsx';
import MovableItem from '../movable-item/movable-item.tsx';

export default function Block({
  index, item, setBlocks, addItem, blocks, items, setItems,
}: any) {
  const block = useRef(null);
  const moveBlockHandler = (dragIndex: any, hoverIndex: any) => {
    const dragItem = blocks[dragIndex];

    if (dragItem) {
      setBlocks((prevState: any) => {
        const coppiedStateArray = [...prevState];
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);
        coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

        return coppiedStateArray;
      });
    }
  };

  const [, drop] = useDrop({
    accept: 'blocks',
    hover(item: any, monitor: any) {
      if (!block.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      // @ts-ignore
      const hoverBoundingRect = block.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveBlockHandler(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [, drag] = useDrag({
    type: 'blocks',
    item: { index },
  });

  const returnItemsForColumn = (columnName: any) => items
    .filter((itm: any) => itm.column === columnName)
    .map((itm: any, idx: number) => (
      <MovableItem
        key={itm.id}
        name={itm.name}
        currentColumnName={itm.column}
        setItems={setItems}
        index={idx}
        items={items}
        id={itm.id}
      />
    ));

  drag(drop(block));
  return (
    <div ref={block}>
      <Column
        index={index}
        title={item}
        name={item}
        currentBlockName={item}
        setBlocks={setBlocks}
        className={classNames(
          'column',
          { 'do-it-column': item === 'block_1' },
          { 'in-progress-column': item !== 'block_2' },
        )}
        addItem={addItem}
      >
        {returnItemsForColumn(item)}
      </Column>
    </div>
  );
}
