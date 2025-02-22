/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, type ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Loader } from '@gravity-ui/uikit';

import useUser from '../hooks/use-user';
import { useAppLocation } from '../hooks/use-app-location';
import { useGetUserMeMutation } from '../store/index';

export default function withUser<P extends Record<string, unknown>>(
  Page: ComponentType<P>,
  shouldBeAuthorized = true,
) {
  return function WithUser(pageProps: P & { user?: User }) {
    const location = useAppLocation();
    const {
      showBoundary,
    } = useErrorBoundary();
    let userData: User | null = useUser();
    const [getUser, {
      isUninitialized,
      isLoading,
      isError,
      error,
      data,
    }] = useGetUserMeMutation();

    useEffect(() => {
      if ((isUninitialized && !userData)) {
        getUser().then(() => {
          if (data && !isError) userData = data;// as unknown as User;
        });
      }
    }, [getUser, isError, isLoading, isUninitialized, userData]);

    if (isLoading || (isUninitialized && !userData)) {
      return <div className="box"><Loader size="m" /></div>;
    }

    if (userData || !shouldBeAuthorized) {
      const pagePropsWithUser = { ...pageProps, user: userData };
      pagePropsWithUser.user = userData;
      return <Page {...pagePropsWithUser} />;
    }

    if (isError && (error as FetchBaseQueryError)?.status !== 401 && !shouldBeAuthorized) {
      showBoundary(error);
      // eslint-disable-next-line no-console
      console.log(error);
      return <div>Something went wrong</div>;
    }

    return <Navigate to="/signin" state={{ from: location.pathname }} />;
  };
}
