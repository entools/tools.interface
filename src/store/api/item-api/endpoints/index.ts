import itemApi from '../index';

// export type Item = {
//   id: number;
//   name: string;
//   block: { id: number };
//   index: number;
// };
type FormPayload = Omit<ItemType, 'id'>;

const itemApiEndpoints = itemApi
  .enhanceEndpoints({
    addTagTypes: ['Item', 'Block'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      createItem: builder.mutation<ItemType, FormPayload>({
        query: (data: FormPayload) => ({
          url: '/items',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['Item', 'Block'],
      }),
      getItem: builder.mutation<{ id: number; items: ItemType[]}, number>({
        query: (blockId: number) => ({
          url: `/items/block/${blockId}`,
          method: 'GET',
        }),
        invalidatesTags: ['Item'],
      }),
      deleteItem: builder.mutation<void, number>({
        query: (itemId: number) => ({
          url: `/items/${itemId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Item'],
      }),
      refreshItem: builder.mutation<ItemType[], ItemType[]>({
        query: (data: ItemType[]) => ({
          url: '/items',
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['Item'],
      }),
      changeItemColumn: builder.mutation<ItemType, { id: number, column: string }>({
        query: (data: { id: number, column: string }) => ({
          url: `/items/${data.id}`,
          method: 'PATCH',
          body: { block: data.column.split('_')[1] },
        }),
        invalidatesTags: ['Item', 'Block'],
      }),
    }),
  });

export const {
  useGetItemMutation,
  useDeleteItemMutation,
  useRefreshItemMutation,
  useChangeItemColumnMutation,
  useCreateItemMutation,
} = itemApiEndpoints;
export { itemApiEndpoints };
