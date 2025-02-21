import profileApi from '../index.ts';

const profileApiEndpoints = profileApi
  .enhanceEndpoints({
    addTagTypes: ['Profile'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUserMe: builder.mutation<User, void>({
        query: () => ({
          url: '/userprofile',
          method: 'GET',
        }),
        invalidatesTags: ['Profile'],
      }),
    }),
  });

export const { useGetUserMeMutation } = profileApiEndpoints;
export { profileApiEndpoints };
