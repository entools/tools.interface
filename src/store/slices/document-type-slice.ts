import { createSlice } from '@reduxjs/toolkit';

import { documentTypesApiEndpoints } from '../api/document-type-api/endpoints/index';
// import { Document } from '..';
import type { RootState } from '..';

type DocumentType = {
  id: number;
  name: string;
  // document: { id: string };
  // index: number;
  // items: ItemType[]
};

type InfoState = {
  data: DocumentType[],
};

export const initialStateDocumentType: InfoState = {
  data: [],
};

const slice = createSlice({
  name: 'documentType',
  initialState: initialStateDocumentType,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        documentTypesApiEndpoints.endpoints.getDocumentTypes.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload }),
      );
  },
});

export default slice.reducer;

export const documentTypesSelector = (state: RootState) => state.documentType.data;
