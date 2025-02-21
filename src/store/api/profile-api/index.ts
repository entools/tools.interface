import { createApi, retry } from '@reduxjs/toolkit/query/react';

import baseQuery from '../../base-profile-query.ts';

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

// Define a service using a base URL and expected endpoints
const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Profile'],
  endpoints: () => ({}),
});

export default profileApi;
