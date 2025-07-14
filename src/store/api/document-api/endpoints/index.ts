import documentApi from '../index';

export type DocumentType = {
  id: string;
  name: string;
  project: { id: string };
  documentType: string;
};
type FormPayload = Omit<DocumentType, 'id'>;

const documentApiEndpoints = documentApi
  .enhanceEndpoints({
    addTagTypes: ['Document'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUserDocuments: builder.mutation<DocumentType[], number>({
        query: (id: number) => ({
          url: `/documents/project/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['Document'],
      }),
      getDocument: builder.mutation<DocumentType, number>({
        query: (id: number) => ({
          url: `/documents/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['Document'],
      }),
      createDocument: builder.mutation<DocumentType, FormPayload>({
        query: (data: FormPayload) => ({
          url: '/documents',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['Document'],
      }),
      updateDocument: builder.mutation<DocumentType, Pick<DocumentType, 'id'> & Partial<DocumentType>>({
        query: (data: DocumentType) => ({
          url: `/documents/${data.id}`,
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['Document'],
        // async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        //   const patchResult = dispatch(
        //     documentApiEndpoints.util.updateQueryData('getDocument', id, (draft) => {
        //       Object.assign(draft, patch);
        //     }),
        //   );
        //   try {
        //     await queryFulfilled;
        //   } catch {
        //     patchResult.undo();
        //   }
        // },
      }),
    }),
  });

export const {
  useGetUserDocumentsMutation,
  useCreateDocumentMutation,
  useGetDocumentMutation,
  useUpdateDocumentMutation,
} = documentApiEndpoints;
export { documentApiEndpoints };
