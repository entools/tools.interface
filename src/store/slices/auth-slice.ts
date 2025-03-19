// import { createSlice } from '@reduxjs/toolkit';

// import { authApiEndpoints } from '../api/auth-api/endpoints/index';
// import type { RootState } from '..';

// export type InfoState = {
//   data: User | null,
// };

// export const initialStateUser: InfoState = {
//   data: null,
// };

// const slice = createSlice({
//   name: 'profile',
//   initialState: initialStateUser,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addMatcher(
//         authApiEndpoints.endpoints.signOut.matchFulfilled,
//         // eslint-disable-next-line @typescript-eslint/no-unused-vars
//         (state, action) => ({ ...state, data: null }),
//       );
//   },
// });

// export default slice.reducer;
// export const userSelector = (state: RootState) => state.user.data;
