/* eslint-disable @typescript-eslint/no-explicit-any */
import { Route, Routes } from 'react-router-dom';

import { useAppLocation } from './hooks/use-app-location.tsx';
import ErrorBoundaryWrapper from './components/error-boundary-wrapper/index.ts';
import ThemeProvider from './providers/theme-provider.tsx';

import MainPage from './pages/main-page/main-page.tsx';
import AboutPage from './pages/about-page/about-page.tsx';
import DocumentPage from './pages/document-page/document-page.tsx';
import ProfilePage from './pages/profile-page/profile-page.tsx';
import OauthPage from './pages/oauth-page/oauth-page.tsx';
import SigninPage from './pages/signin-page/signin-page.tsx';
import SearchPage from './pages/search-page/search-page.tsx';
import NotFoundPage from './pages/not-found-page/not-found-page.tsx';

import './app.css';

function App() {
  const location = useAppLocation();
  // const background = location.state?.pathname;
  const background = location.state?.pathname;

  return (
    <ThemeProvider>
      <ErrorBoundaryWrapper>
        <Routes location={background || location}>
          <Route path="/" element={(<MainPage />)}>
            <Route path="/profile" element={(<ProfilePage />)} />
            <Route path="/about" element={(<AboutPage />)} />
            <Route path="/projects/:projectId/documents/:documentId" element={(<DocumentPage />)} />
          </Route>

          <Route path="/oauth" element={(<OauthPage />)} />
          <Route path="/signin" element={(<SigninPage />)} />
          {/* <Route path="/search" element={(<SearchPage />)} /> */}
          <Route path="*" element={(<NotFoundPage />)} />
        </Routes>

        {background
        && (
          <Routes>
            <Route path="/search" element={(<SearchPage />)} />
          </Routes>
        )}
      </ErrorBoundaryWrapper>
    </ThemeProvider>
  );
}

export default App;
