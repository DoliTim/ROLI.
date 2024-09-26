// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import RegisterPage from './components/RegisterPage';
import SignInPage from './components/SignInPage';
import SubscriptionPage from './components/SubscriptionPage';
import EngagementPage from './components/EngagementPage';
import './App.css'; // Import your styles

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/subscription" element={<SubscriptionPage />} />
      <Route path="/engagement" element={<EngagementPage />} />
    </Routes>
  </Router>
);

export default App;
