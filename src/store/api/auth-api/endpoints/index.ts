import authApi from '../index.ts';

export type FormPayload = Omit<User, 'id'>;

const authApiEndpoints = authApi
  .enhanceEndpoints({
    addTagTypes: ['User'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      signUp: builder.mutation<void, Omit<User, 'id' | 'username'>>({
        query: (data: FormPayload) => ({
          url: '/signup',
          method: 'POST',
          data,
        }),
      }),
    }),
  });

export const { useSignUpMutation } = authApiEndpoints;
