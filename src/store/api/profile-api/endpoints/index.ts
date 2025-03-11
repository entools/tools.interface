import profileApi from '../index';

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
      updateUserSettings: builder.mutation<User, { profileSettings: string }>({
        query: (data) => ({
          url: '/userprofile',
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['Profile'],
      }),
    }),
  });

export const { useGetUserMeMutation, useUpdateUserSettingsMutation } = profileApiEndpoints;
export { profileApiEndpoints };
