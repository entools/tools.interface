/* eslint-disable no-use-before-define */
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
// import { createReduxHistoryContext } from 'redux-first-history';
// import { createBrowserHistory, createMemoryHistory } from 'history';

import { authApi, profileApi, projectApi } from './api/index';

import userReducer from './slices/profile-slice';
import projectReducer from './slices/project-slice';

// import { isServer } from '../utils';

export * from './api/auth-api/endpoints/index';
export * from './api/profile-api/endpoints/index';
export * from './api/project-api/endpoints/index';

export * from './slices/index';

// global redeclared types
declare global {
  interface Window {
    __INITIAL_STATE__: RootState;
  }
}

// const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
//   history: !isServer ? createBrowserHistory() : createMemoryHistory(),
// });

export const store = configureStore({
  reducer: {
    // router: routerReducer,
    // Add the generated reducer as a specific top-level slice
    user: userReducer,
    project: projectReducer,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(
      authApi.middleware,
      profileApi.middleware,
      projectApi.middleware,
    // routerMiddleware,
    ),
});

// export const history = createReduxHistory(store);
// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
