/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, type ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
// import { useErrorHandler } from 'react-error-boundary';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

// import Preloader from '../components/preloader';

import useUser from '../hooks/use-user.tsx';
import { useAppLocation } from '../hooks/use-app-location.tsx';
import { useGetUserMeMutation } from '../store/index.ts';

export default function withUser<P extends Record<string, unknown>>(
  Page: ComponentType<P>,
  shouldBeAuthorized = true,
) {
  return function WithUser(pageProps: P & { user?: User }) {
    const location = useAppLocation();
    // const handleErrors = useErrorHandler();
    let userData: User | null = useUser();
    const [getUser, {
      isUninitialized,
      isLoading,
      isError,
      error,
      data,
    }] = useGetUserMeMutation();

    useEffect(() => {
      if (isUninitialized && !userData) {
        getUser().then(() => {
          if (data && !isError) userData = data as unknown as User;
        });
      }
    }, [getUser, isError, isLoading, isUninitialized, userData]);

    if (isLoading || (isUninitialized && !userData)) {
      // return <Preloader />;
      return <div>loading</div>;
    }

    if (userData || !shouldBeAuthorized) {
      const pagePropsWithUser = { ...pageProps, user: userData };
      pagePropsWithUser.user = userData;
      return <Page {...pagePropsWithUser} />;
    }

    if (isError && (error as FetchBaseQueryError)?.status !== 401 && !shouldBeAuthorized) {
      // handleErrors(error);
      // eslint-disable-next-line no-console
      console.log(error);
      return <div>Something went wrong</div>;
    }

    return <Navigate to="/signin" state={{ from: location.pathname }} />;
  };
}
