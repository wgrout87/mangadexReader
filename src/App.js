import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRouteDashboard from './components/PrivateRouteDashboard';
import ForgotPassword from './components/ForgotPassword';
import PrivateRouteUpdateProfile from './components/PrivateRouteUpdateProfile';
import LinkAccount from './components/LinkAccount'
import TrialFeeds from './components/TrialFeeds'

import { SiteProvider } from './utils/GlobalState';

import Header from './components/Header';

function App() {
  return (
    <div className='App text-light bg-dark min-vh-100'>
      <Router>
        <SiteProvider>
          <AuthProvider>
            <Header />
            <Routes>
              <Route path='/' element={<PrivateRouteDashboard />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/signin' element={<Login />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/update-profile' element={<PrivateRouteUpdateProfile />} />
              <Route path='/link-account' element={<LinkAccount />} />
              <Route path='/trial-feeds' element={<TrialFeeds />} />
              <Route path='/manga' element={<TrialFeeds />} />

            </Routes>
          </AuthProvider>
        </SiteProvider>
      </Router>
    </div>
  );
}

export default App;
