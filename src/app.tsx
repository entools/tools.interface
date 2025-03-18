import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useAppLocation } from './hooks/use-app-location';
import ErrorBoundaryWrapper from './components/error-boundary-wrapper/index';

import MainPage from './pages/main-page/main-page';
import AboutPage from './pages/about-page/about-page';
import DocumentPage from './pages/document-page/document-page';
import ProfilePage from './pages/profile-page/profile-page';
import SearchPage from './pages/search-page/search-page';
import ProjectAdd from './pages/project-add-page/project-add-page';
import UsersPage from './pages/users-page/users-page';

const OauthPage = lazy(() => import('./pages/oauth-page/oauth-page'));
const SigninPage = lazy(() => import('./pages/signin-page/signin-page'));
const SignupPage = lazy(() => import('./pages/signup-page/signup-page'));
const ResetPasswordPage = lazy(() => import('./pages/reset-password-page/reset-password-page'));
const ConfirmEmailPage = lazy(() => import('./pages/confirm-email-page/confirm-email-page'));
const NotFoundPage = lazy(() => import('./pages/not-found-page/not-found-page'));

export default function App() {
  const location = useAppLocation();
  const background = location.state?.pathname;

  return (
    <ErrorBoundaryWrapper>
      <Routes location={background || location}>
        <Route path="/" element={(<MainPage />)}>
          <Route path="/profile" element={(<ProfilePage />)} />
          <Route path="/about" element={(<AboutPage />)} />
          <Route path="/projects/:projectId/documents/:documentId" element={(<DocumentPage />)} />
          <Route path="/projects/add" element={(<ProjectAdd />)} />
        </Route>
      </Routes>
      <Suspense>
        <Routes location={background || location}>
          <Route path="/oauth" element={(<OauthPage />)} />
          <Route path="/signin" element={(<SigninPage />)} />
          <Route path="/signup" element={(<SignupPage />)} />
          <Route path="/reset-password" element={(<ResetPasswordPage />)} />
          <Route path="/confirm-email" element={(<ConfirmEmailPage />)} />
          <Route path="*" element={(<NotFoundPage />)} />
        </Routes>
      </Suspense>

      {background
        && (
          <Routes>
            <Route path="/search" element={(<SearchPage />)} />
            <Route path="/users" element={(<UsersPage />)} />
          </Routes>
        )}
    </ErrorBoundaryWrapper>
  );
}
