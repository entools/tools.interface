import { createSlice } from '@reduxjs/toolkit';

// import { rainRunoffApiEndpoints } from '../api/rain-runoff-api/endpoints/index';

import type { RootState } from '..';

type InfoState = {
  data: RainRunoffType[],
};

export const initialStateRainRunoff: InfoState = {
  data: [],
};

const slice = createSlice({
  name: 'rainRunoff',
  initialState: initialStateRainRunoff,
  reducers: { },
  // extraReducers: (builder) => {
  //   builder
  //     .addMatcher(
  //       rainRunoffApiEndpoints.endpoints.updateRainRunoff.matchFulfilled,
  //       (state, action) => ({
  //         ...state,
  //         data: state.data.map((x) => (x.id === action.payload.id ? action.payload : x)),
  //       }),
  //     );
  // },
});

export default slice.reducer;

export const itemSelector = (state: RootState) => state.rainRunoff.data;
