import { createApi, retry } from '@reduxjs/toolkit/query/react';

import baseQuery from '../../base-item-api-query';

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

// Define a service using a base URL and expected endpoints
const itemApi = createApi({
  reducerPath: 'itemApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Item'],
  endpoints: () => ({}),
});

export default itemApi;
