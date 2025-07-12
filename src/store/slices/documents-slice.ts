import { createSlice } from '@reduxjs/toolkit';

import { documentApiEndpoints } from '../api/document-api/endpoints/index';
import { DocumentType } from '..';
import type { RootState } from '..';

type InfoState = {
  data: DocumentType[],
};

export const initialStateDocuments: InfoState = {
  data: [],
};

const slice = createSlice({
  name: 'documents',
  initialState: initialStateDocuments,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        documentApiEndpoints.endpoints.createDocument.matchFulfilled,
        (state, action) => ({ ...state, data: [...state.data, action.payload] }),
      )
      .addMatcher(
        documentApiEndpoints.endpoints.getUserDocuments.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload }),
      )
      .addMatcher(
        documentApiEndpoints.endpoints.updateDocument.matchFulfilled,
        (state, action) => ({
          ...state,
          data: state.data.map((item) => (action.payload.id === item.id ? action.payload : item)),
        }),
      );
  },
});

export default slice.reducer;
export const documentsSelector = (state: RootState) => state.documents.data;
