import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyle from './GlobalStyle';
import App from './App';
import { AuthProvider } from './contexts/AuthContext'; // If using AuthProvider
import reportWebVitals from './reportWebVitals';
const db = require('./db'); // Import the SQLite connection

// Remove the index.css import if not needed
// import './index.css';
// index.js
require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('./db');

const app = express();

app.use(express.json());

// API routes will be here...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <GlobalStyle /> {/* Apply global styles */}
    <React.StrictMode>
      <AuthProvider> {/* Wrap with AuthProvider if used */}
        <App />
      </AuthProvider>
    </React.StrictMode>
  </>
);

reportWebVitals();
