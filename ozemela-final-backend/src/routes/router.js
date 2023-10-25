import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Menu from '../components/menu';
import ProtectedPage from '../components/protectedPage';
import Home from '../pages/home';
import SignUp from '../pages/signup';
import Posts from '../pages/posts';
import Error from '../pages/error';
import { AuthProvider } from '../contexts/authorization';
import Comments from '../pages/comments';

const AppRoutes = () => {
  return (
    <Router>
      <AuthProvider>
        <Menu />
        <Routes>
          <Route
            path="/"
            element={
              <AnimatePresence mode="wait">
                <Home key="home" />
              </AnimatePresence>
            }
          />
          <Route
            path="/signup"
            element={
              <AnimatePresence mode="wait">
                <SignUp key="signup" />
              </AnimatePresence>
            }
          />
          <Route
            path="/posts"
            element={
              <AnimatePresence mode="wait">
                <ProtectedPage>
                  <Posts key="posts" />
                </ProtectedPage>
              </AnimatePresence>
            }
          />
          <Route
            path="/posts/comments/:id"
            element={
              <AnimatePresence mode="wait">
                <ProtectedPage>
                  <Comments key="comments" />
                </ProtectedPage>
              </AnimatePresence>
            }
          />

          <Route key="error" path="*" element={<Error />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;