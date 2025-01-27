import usersApi from '../index.ts';

const profileApiEndpoints = usersApi
  .enhanceEndpoints({
    addTagTypes: ['Users'],
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
