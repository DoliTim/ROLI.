// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import RegisterPage from './components/RegisterPage';
import SignInPage from './components/SignInPage';
import SubscriptionPage from './components/SubscriptionPage';
import EngagementPage from './components/EngagementPage';
import './App.css'; // Import your styles
import Navbar from './components/Navbar';
import PaymentPage from './components/PaymentPage';
const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/subscription" element={<SubscriptionPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/engagement" element={<EngagementPage />} />
    </Routes>
  </Router>
);

export default App;
