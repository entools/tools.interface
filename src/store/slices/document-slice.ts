import { createSlice } from '@reduxjs/toolkit';

import { documentApiEndpoints } from '../api/document-api/endpoints/index';
import { DocumentType } from '..';
import type { RootState } from '..';

type InfoState = {
  data: DocumentType[],
};

export const initialStateDocument: InfoState = {
  data: [],
};

const slice = createSlice({
  name: 'document',
  initialState: initialStateDocument,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        documentApiEndpoints.endpoints.createDocument.matchFulfilled,
        (state, action) => ({ ...state, data: [...state.data, action.payload] }),
      )
      .addMatcher(
        documentApiEndpoints.endpoints.getUserDocuments.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload }),
      );
  },
});

export default slice.reducer;

export const documentSelector = (state: RootState) => state.document.data;
