import { Route, Routes } from 'react-router-dom';

import { useAppLocation } from './hooks/use-app-location.tsx';
import ErrorBoundaryWrapper from './components/error-boundary-wrapper/index.ts';
import ThemeProvider from './providers/theme-provider.tsx';

import MainPage from './pages/main-page/main-page.tsx';
import AboutPage from './pages/about-page/about-page.tsx';
import ProfilePage from './pages/profile-page/profile-page.tsx';
import OauthPage from './pages/oauth-page/oauth-page.tsx';
import SigninPage from './pages/signin-page/signin-page.tsx';
import NotFoundPage from './pages/not-found-page/not-found-page.tsx';
// ? projects -> sidebar
import ProjectsPage from './pages/projects-page/projects-page.tsx';

import './app.css';

function App() {
  const location = useAppLocation();
  const background = location.state?.pathname;

  return (
    <ThemeProvider>
      <ErrorBoundaryWrapper>
        <Routes location={background || location}>
          <Route path="/" element={(<MainPage />)}>
            <Route path="/profile" element={(<ProfilePage />)} />
            <Route path="/about" element={(<AboutPage />)} />
          </Route>

          <Route path="/oauth" element={(<OauthPage />)} />
          <Route path="/signin" element={(<SigninPage />)} />
          <Route path="/projects" element={(<ProjectsPage />)} />
          <Route path="*" element={(<NotFoundPage />)} />
        </Routes>
      </ErrorBoundaryWrapper>
    </ThemeProvider>
  );
}

export default App;
