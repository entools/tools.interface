import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '..';

export type InfoState = {
  data: User | null,
};

export const initialStateUser: InfoState = {
  data: null,
};

const slice = createSlice({
  name: 'user',
  initialState: initialStateUser,
  reducers: {},
});

export default slice.reducer;
export const userSelector = (state: RootState) => state.user.data;
