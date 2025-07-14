import rainRunoffItemApi from '../index';

export type RainRunoffItemType = {
  id: number;
  name: string;
  block: { id: number };
  index: number;
};
type FormPayload = Omit<RainRunoffItemType, 'id'>;

const rainRunoffItemApiEndpoints = rainRunoffItemApi
  .enhanceEndpoints({
    addTagTypes: ['RainRunoffItem', 'Block'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      createRainRunoffItem: builder.mutation<RainRunoffItemType, FormPayload>({
        query: (data: FormPayload) => ({
          url: '/rain-runoff-items',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['RainRunoffItem', 'Block'],
      }),
      getRainRunoffItem: builder.mutation<{ id: number; items: RainRunoffItemType[]}, number>({
        query: (blockId: number) => ({
          url: `/rain-runoff-items/block/${blockId}`,
          method: 'GET',
        }),
        invalidatesTags: ['RainRunoffItem'],
      }),
      deleteRainRunoffItem: builder.mutation<void, number>({
        query: (itemId: number) => ({
          url: `/rain-runoff-items/${itemId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['RainRunoffItem'],
      }),
      refreshRainRunoffItem: builder.mutation<RainRunoffItemType[], ItemType[]>({
        query: (data: ItemType[]) => ({
          url: '/rain-runoff-items',
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['RainRunoffItem'],
      }),
      changeItemColumn: builder.mutation<RainRunoffItemType, { id: number, column: string }>({
        query: (data: { id: number, column: string }) => ({
          url: `/rain-runoff-items/${data.id}`,
          method: 'PATCH',
          body: { block: data.column.split('_')[1] },
        }),
        invalidatesTags: ['RainRunoffItem', 'Block'],
      }),
    }),
  });

export const {
  useGetRainRunoffItemMutation,
  useDeleteRainRunoffItemMutation,
  useRefreshRainRunoffItemMutation,
  useChangeItemColumnMutation,
  useCreateRainRunoffItemMutation,
} = rainRunoffItemApiEndpoints;
export { rainRunoffItemApiEndpoints };
