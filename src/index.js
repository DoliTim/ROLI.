import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyle from './GlobalStyle';
import App from './App';
import { AuthProvider } from './contexts/AuthContext'; // If using AuthProvider
import reportWebVitals from './reportWebVitals';

// Remove the index.css import if not needed
// import './index.css';

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
