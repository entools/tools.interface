import profileApi from '../index';

type UpdateProfileType = { id: number; email: string; firstName: string; lastName: string }

const profileApiEndpoints = profileApi
  .enhanceEndpoints({
    addTagTypes: ['Profile'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUserMe: builder.mutation<User, void>({
        query: () => ({
          url: '/users/me',
          method: 'GET',
        }),
        invalidatesTags: ['Profile'],
      }),
      updateUserProfile: builder.mutation<User, UpdateProfileType>({
        query: (data) => ({
          url: `/users/${data.id}`,
          method: 'PATCH',
          body: data,
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

export const {
  useGetUserMeMutation, useUpdateUserSettingsMutation, useUpdateUserProfileMutation,
} = profileApiEndpoints;
export { profileApiEndpoints };
