import { createSlice } from '@reduxjs/toolkit';

import { itemApiEndpoints } from '../api/item-api/endpoints/index';

import type { RootState } from '..';

type InfoState = {
  data: Record<number, ItemType[]>,
};

export const initialStateBlock: InfoState = {
  data: {},
};

const slice = createSlice({
  name: 'item',
  initialState: initialStateBlock,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        itemApiEndpoints.endpoints.getItem.matchFulfilled,
        (state, action) => ({
          ...state,
          data: { ...state.data, [action.payload.id]: action.payload.items },
        }),
      );
  },
});

export default slice.reducer;

export const itemSelector = (state: RootState) => state.item.data;
