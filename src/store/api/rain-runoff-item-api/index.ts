import { createApi, retry } from '@reduxjs/toolkit/query/react';

import baseQuery from '../../base-rain-runoff-item-api-query';

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

// Define a service using a base URL and expected endpoints
const rainRunoffItemApi = createApi({
  reducerPath: 'rainRunoffItemApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['RainRunoffItem'],
  endpoints: () => ({}),
});

export default rainRunoffItemApi;
