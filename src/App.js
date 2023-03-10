import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './contexts/AuthContext';
import { createBrowserRouter, RouterProvider as Router, redirect } from 'react-router-dom';
import Root from './components/Root';
import PrivateRouteDashboard from './components/PrivateRouteDashboard';
import ForgotPassword from './components/ForgotPassword';
import PrivateRouteUpdateProfile from './components/PrivateRouteUpdateProfile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'dashboard',
        element: <PrivateRouteDashboard />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'update-profile',
        element: <PrivateRouteUpdateProfile />,
      }
    ]
  },
]);

function App() {
  return (
    <AuthProvider>
      <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
        <div className='w-100' style={{ maxWidth: '400px' }}>
          <Router router={router} />
        </div>
      </Container>
    </AuthProvider>
  );
}

export default App;
