import { createSlice } from '@reduxjs/toolkit';

import { rainRunoffItemApiEndpoints } from '../api/rain-runoff-item-api/endpoints/index';

import type { RootState } from '..';

import { RainRunoffItemType } from '..';

type InfoState = {
  data: Record<number, RainRunoffItemType[]>,
};

export const initialStateBlock: InfoState = {
  data: {},
};

const slice = createSlice({
  name: 'rainRunoffItem',
  initialState: initialStateBlock,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        rainRunoffItemApiEndpoints.endpoints.getRainRunoffItem.matchFulfilled,
        (state, action) => ({
          ...state,
          data: { ...state.data, [action.payload.id]: action.payload.items },
        }),
      );
  },
});

export default slice.reducer;

export const rainRunoffItemSelector = (state: RootState) => state.rainRunoffItem.data;
