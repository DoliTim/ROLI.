import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import RegisterPage from './components/RegisterPage';
import SignInPage from './components/SignInPage';
import SubscriptionPage from './components/SubscriptionPage';
import EngagementPage from './components/EngagementPage';
import PaymentPage from './components/PaymentPage';
import Teams from './components/Teams';
import README from './components/README'; // Import the README component
import Referral from './components/Referral'; // Import the Referral component
import AdminPanel from './components/AdminPanel'; // Import the AdminPanel component
import './App.css'; // Import your styles
import Navbar from './components/Navbar';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/subscription" element={<SubscriptionPage />} />
      <Route path="/engagement" element={<EngagementPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/readme" element={<README />} /> {/* Add README Route */}
      <Route path="/referral" element={<Referral />} /> {/* Add Referral Route */}
      <Route path="/admin" element={<AdminPanel />} /> {/* Add AdminPanel Route */}
    </Routes>
  </Router>
);

export default App;
