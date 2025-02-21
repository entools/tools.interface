import authApi from '../index.ts';

export type FormPayload = Omit<User, 'id'>;
type SignInType = {
  email: string;
  password: string;
};
type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

const authApiEndpoints = authApi
  .enhanceEndpoints({
    addTagTypes: ['User'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      signUp: builder.mutation<void, Omit<User, 'id' | 'username'>>({
        query: (data: FormPayload) => ({
          url: '/register',
          method: 'POST',
          body: data,
        }),
      }),
      signIn: builder.mutation<void, SignInType>({
        query: (data: FormPayload) => ({
          url: '/login',
          method: 'POST',
          body: data,
        }),
      }),
      signOut: builder.mutation<void, void>({
        query: () => ({
          url: '/logout',
          method: 'POST',
        }),
      }),
      refreshToken: builder.mutation<ResponseToken, Record<string, string>>({
        query: ({ token }) => ({
          url: '/auth/refresh-token',
          method: 'POST',
          body: { token },
        }),
      }),
    }),
  });

export const {
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation,
  useRefreshTokenMutation,
} = authApiEndpoints;
