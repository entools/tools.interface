import { PropsWithChildren } from 'react';

import 'react-toastify/dist/ReactToastify.css';

import Provider from '../hooks/use-dark-theme';

export default function ThemeProviderL({ children }: PropsWithChildren) {
  return (
    <Provider>
      { children }
    </Provider>
  );
}
