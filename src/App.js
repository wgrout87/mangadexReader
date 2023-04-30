import './App.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRouteDashboard from './pages/PrivateRouteDashboard';
import ForgotPassword from './pages/ForgotPassword';
import PrivateRouteUpdateProfile from './pages/PrivateRouteUpdateProfile';
import LinkAccount from './pages/LinkAccount';
import TrialFeeds from './pages/TrialFeeds';
import IndividualManga from './pages/IndividualManga';
import IndividualChapter from './pages/IndividualChapter';

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
              <Route path='/manga' element={<IndividualManga />} />
              <Route path='/chapter' element={<IndividualChapter />} />
            </Routes>
          </AuthProvider>
        </SiteProvider>
      </Router>
    </div>
  );
}

export default App;
