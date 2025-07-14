import blockApi from '../index';

export type BlockType = {
  id: number;
  name: string;
  document: { id: string };
  index: number;
  items: ItemType[]
};
type FormPayload = Omit<BlockType, 'id'>;

const blockApiEndpoints = blockApi
  .enhanceEndpoints({
    addTagTypes: ['Block'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      createBlock: builder.mutation<BlockType, Omit<FormPayload, 'items'>>({
        query: (data: Omit<FormPayload, 'items'>) => ({
          url: '/blocks',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['Block'],
      }),
      getDocumentBlocks: builder.mutation<BlockType[], number>({
        query: (id: number) => ({
          url: `/blocks/document/${id}`,
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
          url: `/blocks/document/${id}`,
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['Block'],
        // async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        //   const patchResult = dispatch(
        //     blockApiEndpoints.util.updateQueryData('getDocumentBlocks', id, (draft) => {
        //       Object.assign(draft, patch);
        //     }),
        //   );
        //   try {
        //     console.log(123);
        //     await queryFulfilled;
        //   } catch {
        //     patchResult.undo();

        //   /**
        //    * Alternatively, on failure you can invalidate the corresponding cache tags
        //    * to trigger a re-fetch:
        //    * dispatch(api.util.invalidateTags(['Post']))
        //    */
        //   }
        // },
      }),
      updateBlocks: builder.mutation<BlockType, Block>({
        query: (data: Block) => ({
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
