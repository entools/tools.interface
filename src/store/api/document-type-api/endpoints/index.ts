import documentTypeApi from '../index';

type DocumentType = {
  id: number;
  name: string;
  // document: { id: string };
  // index: number;
  // items: ItemType[]
};
// type FormPayload = Omit<DocumentType, 'id'>;

const documentTypesApiEndpoints = documentTypeApi
  .enhanceEndpoints({
    addTagTypes: ['DocumentType'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getDocumentTypes: builder.mutation<DocumentType[], void>({
        query: () => ({
          url: '/document-types',
          method: 'GET',
        }),
        invalidatesTags: ['DocumentType'],
      }),
    }),
  });

export const {
  useGetDocumentTypesMutation,
} = documentTypesApiEndpoints;
export { documentTypesApiEndpoints };
