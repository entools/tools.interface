import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import classNames from 'classnames';

import Column from '../column/column.tsx';
import MovableItem from '../movable-item/movable-item.tsx';

export default function Block({
  index, item, setBlocks, blocks, items, setItems,
}: BlockType) {
  const block = useRef(null);
  const addItem = (blck: string) => {
    setItems([...items, { id: items.length + 1, name: `Item ${items.length + 1}`, column: blck }]);
  };
  const removeBlock = (title: string) => setBlocks(blocks.filter((x: string) => x !== title));
  const moveBlockHandler = (dragIndex: number, hoverIndex: number) => {
    const dragItem = blocks[dragIndex];

    if (dragItem) {
      setBlocks((prevState: string[]) => {
        const coppiedStateArray = [...prevState];
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);
        coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

        return coppiedStateArray;
      });
    }
  };

  const [, drop] = useDrop({
    accept: 'blocks',
    hover(itm: { index: number }, monitor) {
      if (!block.current) {
        return;
      }
      const dragIndex = itm.index!;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      // @ts-ignore
      const hoverBoundingRect = block.current?.getBoundingClientRect();
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

  const [, drag] = useDrag({
    type: 'blocks',
    item: { index },
  });

  const returnItemsForColumn = (columnName: string) => items
    .filter((itm: ItemType) => itm.column === columnName)
    .map((itm: ItemType, idx: number) => (
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
        className={classNames('column')}
        addItem={addItem}
        removeBlock={removeBlock}
      >
        {returnItemsForColumn(item)}
      </Column>
    </div>
  );
}
