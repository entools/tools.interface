import { createApi, retry } from '@reduxjs/toolkit/query/react';

import baseQuery from '../../base-document-type-query';

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

// Define a service using a base URL and expected endpoints
const documentTypeApi = createApi({
  reducerPath: 'documentTypeApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['DocumentType'],
  endpoints: () => ({}),
});

export default documentTypeApi;
