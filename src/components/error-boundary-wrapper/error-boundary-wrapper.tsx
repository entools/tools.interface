/* eslint-disable no-console */
/* eslint-disable react/no-children-prop */
import type { PropsWithChildren } from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { Button, Text } from '@gravity-ui/uikit';

import Content from '../content/index';

import style from './error-boundary.module.css';

type ErrorBoundaryWrapperProps = PropsWithChildren<unknown>;

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Content
      children={(
        <div className={style.boundary}>
          <Text variant="header-1">APP-ERROR</Text>
          <Text className={style.mt} variant="body-1">{error.message}</Text>
          <Text variant="body-1" className={style.block}>
            Try to
            <Button
              view="action"
              size="xl"
              onClick={resetErrorBoundary}
            >
              Reload app
            </Button>
            or
            <Button
              view="flat"
              size="l"
              onClick={resetErrorBoundary}
            >
              Go to homepage
            </Button>
          </Text>
        </div>
      )}
    />
  );
}

export default function ErrorBoundaryWrapper({ children }: ErrorBoundaryWrapperProps) {
  return (
    <ErrorBoundary onReset={() => console.log('reset')} FallbackComponent={ErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}
