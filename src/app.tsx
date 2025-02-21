import { Route, Routes } from 'react-router-dom';

import { useAppLocation } from './hooks/use-app-location.tsx';
import ErrorBoundaryWrapper from './components/error-boundary-wrapper/index.ts';
// import ThemeContext from './context/theme-context.ts';
// import useDarkTheme from './hooks/use-dark-theme.tsx';

import MainPage from './pages/main-page/main-page.tsx';
import AboutPage from './pages/about-page/about-page.tsx';
import DocumentPage from './pages/document-page/document-page.tsx';
import ProfilePage from './pages/profile-page/profile-page.tsx';
import OauthPage from './pages/oauth-page/oauth-page.tsx';
import SigninPage from './pages/signin-page/signin-page.tsx';
import SignupPage from './pages/signup-page/signup-page.tsx';
import SearchPage from './pages/search-page/search-page.tsx';
import ConfirmEmailPage from './pages/confirm-email-page/confirm-email-page.tsx';
import ResetPasswordPage from './pages/reset-password-page/reset-password-page.tsx';
import ProjectAdd from './pages/project-add-page/project-add-page.tsx';
import UsersPage from './pages/users-page/users-page.tsx';
import NotFoundPage from './pages/not-found-page/not-found-page.tsx';

export default function App() {
  const location = useAppLocation();
  const background = location.state?.pathname;
  // const { providerValue } = useDarkTheme();

  return (
  // <ThemeContext.Provider value={providerValue}>
    <ErrorBoundaryWrapper>
      <Routes location={background || location}>
        <Route path="/" element={(<MainPage />)}>
          <Route path="/profile" element={(<ProfilePage />)} />
          <Route path="/about" element={(<AboutPage />)} />
          <Route path="/projects/:projectId/documents/:documentId" element={(<DocumentPage />)} />
          <Route path="/projects/add" element={(<ProjectAdd />)} />
        </Route>
        <Route path="/oauth" element={(<OauthPage />)} />
        <Route path="/signin" element={(<SigninPage />)} />
        <Route path="/signup" element={(<SignupPage />)} />
        <Route path="/reset-password" element={(<ResetPasswordPage />)} />
        <Route path="/confirm-email" element={(<ConfirmEmailPage />)} />
        <Route path="*" element={(<NotFoundPage />)} />
      </Routes>

      {background
        && (
          <Routes>
            <Route path="/search" element={(<SearchPage />)} />
            <Route path="/users" element={(<UsersPage />)} />
          </Routes>
        )}
    </ErrorBoundaryWrapper>
  // </ThemeContext.Provider>
  );
}
