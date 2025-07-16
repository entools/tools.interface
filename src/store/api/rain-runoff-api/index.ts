import { createApi, retry } from '@reduxjs/toolkit/query/react';

import baseQuery from '../../base-block-query';

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

// Define a service using a base URL and expected endpoints
const rainRunoffApi = createApi({
  reducerPath: 'rainRunoffApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['RainRunoffApi'],
  endpoints: () => ({}),
});

export default rainRunoffApi;
