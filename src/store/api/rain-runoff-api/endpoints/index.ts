import rainRunoffApi from '../index';

const rainRunoffApiEndpoints = rainRunoffApi
  .enhanceEndpoints({
    addTagTypes: ['RainRunoff'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      updateRainRunoff: builder.mutation<RainRunoffType, RainRunoffType>({
        query: (data: RainRunoffType) => ({
          url: `/rain-runoffs/${data.id}`,
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['RainRunoff'],
      }),
    }),
  });

export const {
  useUpdateRainRunoffMutation,
} = rainRunoffApiEndpoints;
export { rainRunoffApiEndpoints };
