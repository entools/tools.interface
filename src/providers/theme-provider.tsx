/* eslint-disable import/no-extraneous-dependencies */
import { PropsWithChildren } from 'react';

// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import Provider from '../context/theme-context.ts';
import Provider from '../hooks/use-dark-theme.tsx';

export default function ThemeProviderL({ children }: PropsWithChildren) {
  return (
    <Provider>
      { children }
    </Provider>
  );
}
