import { createApi, retry } from '@reduxjs/toolkit/query/react';

import baseQuery from '../../base-document-query';

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

// Define a service using a base URL and expected endpoints
const documentApi = createApi({
  reducerPath: 'documentApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Document'],
  endpoints: () => ({}),
});

export default documentApi;
