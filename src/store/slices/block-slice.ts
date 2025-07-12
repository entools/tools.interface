import { createSlice } from '@reduxjs/toolkit';

import { blockApiEndpoints } from '../api/block-api/endpoints/index';
import { BlockType } from '..';
import type { RootState } from '..';

type InfoState = {
  data: BlockType[],
};

export const initialStateBlock: InfoState = {
  data: [],
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
    ) => ({ ...state, data }),
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        blockApiEndpoints.endpoints.createBlock.matchFulfilled,
        (state, action) => ({
          ...state,
          data: [...state.data, action.payload].sort(compareByName),
        }),
      )
      .addMatcher(
        blockApiEndpoints.endpoints.getDocumentBlocks.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload.sort(compareByName) }),
      )
      .addMatcher(
        blockApiEndpoints.endpoints.removeBlock.matchFulfilled,
        (state, action) => ({ ...state, data: state.data.filter((x) => +x.id !== action.payload) }),
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

export const { setBlocks } = slice.actions;
export default slice.reducer;

export const blockSelector = (state: RootState) => state.block.data;
