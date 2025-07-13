import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { blockApiEndpoints } from '../api/block-api/endpoints/index';
import { rainRunoffItemApiEndpoints } from '../api/rain-runoff-item-api/endpoints/index';

import { BlockType } from '..';
import type { RootState } from '..';

// type InfoState = {
//   data: BlockType[],
// };
type InfoState = {
  data: {
    blocks: BlockType[],
    items: ItemType[],
  },
};

// export const initialStateBlock: InfoState = {
//   data: [],
// };
export const initialStateBlock: InfoState = {
  data: {
    blocks: [],
    items: [],
  },
};

function compareByName(a: BlockType, b: BlockType) {
  if (a.index < b.index) {
    return -1;
  }
  if (a.index > b.index) {
    return 1;
  }

  return 0;
}

const slice = createSlice({
  name: 'block',
  initialState: initialStateBlock,
  reducers: {
    setBlocks: (
      state,
      { payload: data },
    ) => ({
      ...state,
      data: {
        blocks: data,
        items: state.data.items,
      },
    }),
    setItemsInBlocks: (
      state,
      { payload: data }: PayloadAction<{blockId: string;}>,
    ) => ({
      ...state,
      data: {
        blocks: state.data.blocks,
        items: [
          ...state.data.items,
          {
            id: state.data.items.length + 1,
            name: `Item ${state.data.items.length + 1}`,
            column: data.blockId,
          },
        ],
      },
    }),
    // [...items, { id: items.length + 1, name: `Item ${items.length + 1}`, column }]

    changeColumn: (
      state,
      { payload: data },
    ) => ({
      ...state,
      data: {
        blocks: state.data.blocks,
        items: state.data.items.map((item) => (item.id === data.id
          ? { ...item, column: data.column }
          : item)),
      },
    }),

    moveItem: (
      state,
      { payload: data }: PayloadAction<{dragIndex: number; hoverIndex: number}>,
    ) => {
      const newItems = [...state.data.items];
      const [movedItem] = newItems.splice(data.dragIndex, 1);
      newItems.splice(data.hoverIndex, 0, movedItem);

      return {
        ...state,
        data: {
          blocks: state.data.blocks,
          items: newItems.map((x, index) => ({ ...x, index })),
        },
      };
    },
    deleteItem: (
      state,
      { payload: data }: PayloadAction<{id: number;}>,
    ) => ({
      ...state,
      data: {
        blocks: state.data.blocks,
        items: state.data.items.filter((x: ItemType) => x.id !== data.id),
      },
    }),
    // deleteItem

    // moveItem: (state, action: PayloadAction<{dragIndex: number; hoverIndex: number}>) => {
    //   const newItems = [...state];
    //   const [movedItem] = newItems.splice(action.payload.dragIndex, 1);
    //   newItems.splice(action.payload.hoverIndex, 0, movedItem);
    //   return newItems;
    // },

  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        blockApiEndpoints.endpoints.createBlock.matchFulfilled,
        (state, action) => ({
          ...state,
          data: {
            blocks: [...state.data.blocks, action.payload].sort(compareByName),
            items: state.data.items,
          },
        }),
      )
      .addMatcher(
        blockApiEndpoints.endpoints.getDocumentBlocks.matchFulfilled,
        (state, action) => ({
          ...state,
          data: {
            blocks: action.payload.sort(compareByName),
            items: action.payload.reduce((a, x) => [...a, ...x.items.map((it) => ({ ...it, column: `block_${x.id}` }))], [] as ItemType[]), // state.data.items,
          },
        }),
      )
      .addMatcher(
        blockApiEndpoints.endpoints.removeBlock.matchFulfilled,
        (state, action) => ({
          ...state,
          data: {
            blocks: state.data.blocks.filter((x) => +x.id !== action.payload),
            items: state.data.items, // !!!!
          },
        }),
      )
      .addMatcher(
        blockApiEndpoints.endpoints.createRainRunoffItem.matchFulfilled,
        (state, action) => ({
          ...state,
          data: {
            blocks: state.data.blocks,
            items: [
              ...state.data.items,
              {
                id: action.payload.id,
                name: action.payload.name,
                column: `block_${action.payload.block.id}`,
                index: action.payload.index,
              },
            ],
          },
        }),
      )
      // .addMatcher(
      //   rainRunoffItemApiEndpoints.endpoints.deleteRainRunoffItem.matchFulfilled,
      //   (state, action) => ({
      //     ...state,
      //     data: {
      //       blocks: state.data.blocks,
      //       items: state.data.items,
      //     },
      //   }),
      // )

      .addMatcher(
        rainRunoffItemApiEndpoints.endpoints.deleteRainRunoffItem.matchFulfilled,
        (state, action) => ({
          ...state,
          data: {
            blocks: state.data.blocks,
            items: state.data.items.filter((x: ItemType) => x.id !== action.meta.arg.originalArgs),
          },
        }),
      );
    // .addMatcher(
    //   blockApiEndpoints.endpoints.updateBlocks.matchFulfilled,
    //   (state, action) => ({
    //     ...state,
    //     data: state.data.map((x) => (x.id === action.payload.id
    //       ? { ...x, name: action.payload.name }
    //       : x)),
    //   }),
    // );
  },
});

export const {
  setBlocks, setItemsInBlocks, changeColumn, moveItem, deleteItem,
} = slice.actions;
export default slice.reducer;

export const blockSelector = (state: RootState) => state.block.data;
