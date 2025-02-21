import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import Column from '../column/column.tsx';
import MovableItem from '../movable-item/movable-item.tsx';

export default function Block({
  index, block, setBlocks, blocks, items, setItems,
}: BlockType) {
  const ref = useRef(null);
  const addItem = (column: string) => {
    setItems([...items, { id: items.length + 1, name: `Item ${items.length + 1}`, column }]);
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
        key={item.id}
        name={item.name}
        currentColumnName={item.column}
        setItems={setItems}
        index={idx}
        items={items}
        id={item.id}
      />
    ));

  const opacity = isDragging ? 0.4 : 1;
  const border = isDragging ? 'solid 1px var(--g-color-base-generic)' : 'none';

  drag(drop(ref));
  return (
    <div
      ref={ref}
      style={{ opacity, border, borderRadius: '8px' }}
    >
      <Column
        title={block}
        addItem={addItem}
        removeBlock={removeBlock}
      >
        {returnItemsForColumn(block)}
      </Column>
    </div>
  );
}
