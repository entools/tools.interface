import { createSlice } from '@reduxjs/toolkit';

import { profileApiEndpoints } from '../api/profile-api/endpoints/index.ts';
import type { RootState } from '../index.ts';

export type InfoState = {
  data: User | null,
};

export const initialStateUser: InfoState = {
  data: null,
};

const slice = createSlice({
  name: 'profile',
  initialState: initialStateUser,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        profileApiEndpoints.endpoints.getUserMe.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload }),
      );
    // .addMatcher(
    //   usersApiEndpoints.endpoints.getUserMe.matchRejected,
    //   (state, action) => console.log('rejected', action),
    // )
  },
});

export default slice.reducer;
export const userSelector = (state: RootState) => state.user.data;
