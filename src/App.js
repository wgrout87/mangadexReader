import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRouteDashboard from './components/PrivateRouteDashboard';
import ForgotPassword from './components/ForgotPassword';
import PrivateRouteUpdateProfile from './components/PrivateRouteUpdateProfile';

import { SiteProvider } from './utils/GlobalState';

import Home from './pages/Home';
import Header from './components/Header';

function App() {
  return (
    <div className='App'>
      <Router>
        <SiteProvider>
          <AuthProvider>
            <Header />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<Login />} />
              <Route path='/dashboard' element={<PrivateRouteDashboard />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/update-profile' element={<PrivateRouteUpdateProfile />} />
            </Routes>
          </AuthProvider>
        </SiteProvider>
      </Router>
    </div>
  );
}

export default App;
