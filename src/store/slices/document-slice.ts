import { createSlice } from '@reduxjs/toolkit';

import { documentApiEndpoints } from '../api/document-api/endpoints/index';
import { DocumentType } from '..';
import type { RootState } from '..';

type InfoState = {
  data: DocumentType | null,
};

export const initialStateDocument: InfoState = {
  data: null,
};

const slice = createSlice({
  name: 'document',
  initialState: initialStateDocument,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        documentApiEndpoints.endpoints.getDocument.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload }),
      );
  },
});

export default slice.reducer;

export const documentSelector = (state: RootState) => state.document.data;
