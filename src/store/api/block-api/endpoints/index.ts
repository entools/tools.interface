import blockApi from '../index';

export type BlockType = {
  id: number;
  name: string;
  document: { id: string };
  index: number;
};
type FormPayload = Omit<BlockType, 'id'>;

const blockApiEndpoints = blockApi
  .enhanceEndpoints({
    addTagTypes: ['Block'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      createBlock: builder.mutation<BlockType, FormPayload>({
        query: (data: FormPayload) => ({
          url: '/blocks',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['Block'],
      }),
      getDocumentBlocks: builder.mutation<BlockType[], number>({
        query: (id: number) => ({
          url: `/blocks/document${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['Block'],
      }),
      removeBlock: builder.mutation<number, number>({
        query: (id: number) => ({
          url: `/blocks/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Block'],
      }),
      refreshBlocks: builder.mutation<BlockType[], { id: number, data: BlockType[] }>({
        query: ({ id, data }: { id: number, data: BlockType[] }) => ({
          url: `/blocks/document${id}`,
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['Block'],
      }),
      updateBlocks: builder.mutation<BlockType, BlockType>({
        query: (data: BlockType) => ({
          url: `/blocks/${data.id}`,
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['Block'],
      }),
    }),
  });

export const {
  useCreateBlockMutation,
  useGetDocumentBlocksMutation,
  useRemoveBlockMutation,
  useRefreshBlocksMutation,
  useUpdateBlocksMutation,
} = blockApiEndpoints;
export { blockApiEndpoints };
