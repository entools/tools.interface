/* eslint-disable import/no-extraneous-dependencies */
// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ThemeProvider from './providers/theme-provider.tsx';

import App from './app.tsx';
import { store } from './store/index.ts';

import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
);
