/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import classNames from 'classnames';
import {
  IoIosAlbums,
  // IoIosAdd,
  IoMdShareAlt, IoMdDownload, IoIosEye,
} from 'react-icons/io';
import style from './document-page.module.css';
import '.app.css';

const COLUMN_NAMES = {
  DO_IT: 'Do it',
  IN_PROGRESS: 'In Progress',
  AWAITING_REVIEW: 'Awaiting review',
  DONE: 'Done',
};

// const { DO_IT } = COLUMN_NAMES;
// //
const tasks = [
  { id: 1, name: 'Item 1', column: 'Do it' },
  { id: 2, name: 'Item 2', column: 'Do it' },
  { id: 3, name: 'Item 3', column: 'Do it' },
  { id: 4, name: 'Item 4', column: 'Do it' },
];

function MovableItem({
  name,
  index,
  currentColumnName,
  moveCardHandler,
  setItems,
}: any) {
  const changeItemColumn = (currentItem: any, columnName: any) => {
    setItems((prevState: any) => prevState.map((e: any) => ({
      ...e,
      column: e.name === currentItem.name ? columnName : e.column,
    })));
  };

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'Our first type',
    hover(item: any, monitor: any) {
      if (!ref.current) {
        return;
      }
      // @ts-ignore
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      // @ts-ignore
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      // @ts-ignore
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCardHandler(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'Our first type',
    item: {
      index, name, currentColumnName, // type: 'Our first type',
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (dropResult) {
        const { name } = dropResult as any;
        const {
          DO_IT, IN_PROGRESS, AWAITING_REVIEW, DONE,
        } = COLUMN_NAMES;
        switch (name) {
          case IN_PROGRESS:
            changeItemColumn(item, IN_PROGRESS);
            break;
          case AWAITING_REVIEW:
            changeItemColumn(item, AWAITING_REVIEW);
            break;
          case DONE:
            changeItemColumn(item, DONE);
            break;
          case DO_IT:
            changeItemColumn(item, DO_IT);
            break;
          default:
            break;
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
      {name}
    </div>
  );
}

function Column({ children, className, title }: any) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'Our first type',
    drop: () => ({ name: title }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    // Override monitor.canDrop() function
    canDrop: (item) => {
      const {
        DO_IT, IN_PROGRESS, AWAITING_REVIEW, DONE,
      } = COLUMN_NAMES;
      const { currentColumnName } = item as any;
      return (
        currentColumnName === title
        || (currentColumnName === DO_IT && title === IN_PROGRESS)
        || (currentColumnName === IN_PROGRESS
          && (title === DO_IT || title === AWAITING_REVIEW))
        || (currentColumnName === AWAITING_REVIEW
          && (title === IN_PROGRESS || title === DONE))
        || (currentColumnName === DONE && title === AWAITING_REVIEW)
      );
    },
  });

  const getBackgroundColor = () => {
    if (isOver) {
      if (canDrop) {
        return 'rgb(188,251,255)';
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
      className={className}
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <p>{title}</p>
      {children}
    </div>
  );
}

export default function DocumentPage() {
  const { projectId, documentId } = useParams();
  const [history, setHistory] = useState(false);
  const [items, setItems] = useState(tasks);

  const moveCardHandler = (dragIndex: any, hoverIndex: any) => {
    const dragItem = items[dragIndex];

    if (dragItem) {
      setItems((prevState) => {
        const coppiedStateArray = [...prevState];

        // remove item by "hoverIndex" and put "dragItem" instead
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);

        // remove item by "dragIndex" and put "prevItem" instead
        coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

        return coppiedStateArray;
      });
    }
  };

  const returnItemsForColumn = (columnName: any) => items
    .filter((item) => item.column === columnName)
    .map((item, index) => (
      <MovableItem
        key={item.id}
        name={item.name}
        currentColumnName={item.column}
        setItems={setItems}
        index={index}
        moveCardHandler={moveCardHandler}
      />
    ));

  const {
    DO_IT, IN_PROGRESS, AWAITING_REVIEW, DONE,
  } = COLUMN_NAMES;

  return (
    <div className="layout">
      <h2 className="title">{`Document ${documentId} #${projectId}`}</h2>
      <div className={style.tools}>
        Tools
        <div>
          <button
            type="button"
            className={classNames('button', style.button)}
            title="Подписаться"
          >
            <IoIosEye />
          </button>
          <button
            type="button"
            className={classNames('button', style.button)}
            title="Скачать"
          >
            <IoMdDownload />
          </button>
          <button
            type="button"
            className={classNames('button', style.button)}
            title="Share"
          >
            <IoMdShareAlt />
          </button>
          <button
            type="button"
            className="button"
            onClick={() => setHistory(!history)}
            title={history ? 'On' : 'Off'}
          >
            <IoIosAlbums />
          </button>
        </div>
      </div>
      <div className={classNames(style.form, { [style.two]: history })}>
        <div className="container">
          <DndProvider backend={HTML5Backend}>
            <Column title={DO_IT} className="column do-it-column">
              {returnItemsForColumn(DO_IT)}
            </Column>
            <Column title={IN_PROGRESS} className="column in-progress-column">
              {returnItemsForColumn(IN_PROGRESS)}
            </Column>
            <Column
              title={AWAITING_REVIEW}
              className="column awaiting-review-column"
            >
              {returnItemsForColumn(AWAITING_REVIEW)}
            </Column>
            <Column title={DONE} className="column done-column">
              {returnItemsForColumn(DONE)}
            </Column>
          </DndProvider>
        </div>
        {history && (
        <div className={style.history}>
          <h3 className={style.title}>History</h3>
          <ul className={style.list}>
            <li className={style.item}>item 1</li>
            <li className={style.item}>item 2</li>
          </ul>
        </div>
        )}
      </div>
    </div>
  );
}
