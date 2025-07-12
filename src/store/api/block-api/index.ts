import { createApi, retry } from '@reduxjs/toolkit/query/react';

import baseQuery from '../../base-block-query';

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

// Define a service using a base URL and expected endpoints
const blockApi = createApi({
  reducerPath: 'blockApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Block'],
  endpoints: () => ({}),
});

export default blockApi;
