import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { blockApiEndpoints } from '../api/block-api/endpoints/index';
import { itemApiEndpoints } from '../api/item-api/endpoints/index';
import { rainRunoffApiEndpoints } from '../api/rain-runoff-api/endpoints/index';

import type { RootState } from '..';

import compareByName from '~/utils/compare-by-name';

type BlockType = Block & { items: ItemType[] };
type InfoState = {
  data: {
    blocks: BlockType[],
    items: ItemType[],
  },
};

export const initialStateBlock: InfoState = {
  data: {
    blocks: [],
    items: [],
  },
};

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
        itemApiEndpoints.endpoints.changeItemColumn.matchFulfilled,
        (state, action) => ({
          ...state,
          data: {
            blocks: state.data.blocks,
            items: state.data.items.map((item) => (item.id === action.meta.arg.originalArgs.id
              ? {
                ...item,
                column: action.meta.arg.originalArgs.column,
                block: {
                  id: +action.meta.arg.originalArgs.column.split('_')[1],
                },
              }
              : item)),
          },
        }),
      )

      .addMatcher(
        blockApiEndpoints.endpoints.getDocumentBlocks.matchFulfilled,
        (state, action) => ({
          ...state,
          data: {
            blocks: action.payload.sort(compareByName),
            items: action.payload
              .reduce((a, x) => [
                ...a,
                ...x.items.map((it) => ({ ...it, column: `block_${x.id}`, block: x })),
              ], [] as ItemType[]).sort(compareByName), // state.data.items,
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
        itemApiEndpoints.endpoints.createItem.matchFulfilled,
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
                block: { id: action.payload.block.id },
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
              },
            ],
          },
        }),
      )
      .addMatcher(
        blockApiEndpoints.endpoints.refreshBlocks.matchFulfilled,
        (state, action) => ({
          ...state,
          data: {
            blocks: action.meta.arg.originalArgs.data,
            items: state.data.items,
          },
        }),
      )
      .addMatcher(
        itemApiEndpoints.endpoints.refreshItem.matchFulfilled,
        (state, action) => ({
          ...state,
          data: {
            blocks: state.data.blocks,
            items: action.meta.arg.originalArgs,
          },
        }),
      )
      .addMatcher(
        itemApiEndpoints.endpoints.deleteItem.matchFulfilled,
        (state, action) => ({
          ...state,
          data: {
            blocks: state.data.blocks,
            items: state.data.items.filter((x: ItemType) => x.id !== action.meta.arg.originalArgs),
          },
        }),
      )
      .addMatcher(
        rainRunoffApiEndpoints.endpoints.updateRainRunoff.matchFulfilled,
        (state, action) => ({
          ...state,
          data: {
            blocks: state.data.blocks,
            // eslint-disable-next-line max-len
            items: state.data.items.map((x) => (x.rainRunoff.id === action.meta.arg.originalArgs.id
              ? { ...x, rainRunoff: action.meta.arg.originalArgs }
              : x)),
          },
        }),
      );
  },
});

export const { setBlocks, moveItem, deleteItem } = slice.actions;
export default slice.reducer;

export const blockSelector = (state: RootState) => state.block.data;
