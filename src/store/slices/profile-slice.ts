import { createSlice } from '@reduxjs/toolkit';

import { profileApiEndpoints } from '../api/profile-api/endpoints/index';
import { authApiEndpoints } from '../api/auth-api/endpoints/index';
import type { RootState } from '..';

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
      ).addMatcher(
        authApiEndpoints.endpoints.signOut.matchFulfilled,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (state, action) => ({ ...state, data: null }),
      );
    // .addMatcher(
    //   usersApiEndpoints.endpoints.getUserMe.matchRejected,
    //   (state, action) => console.log('rejected', action),
    // )
  },
});

export default slice.reducer;
export const userSelector = (state: RootState) => state.user.data;
