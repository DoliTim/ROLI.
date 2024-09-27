// src/contexts/ThemeContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { lightTheme, darkTheme } from '../theme';

// Create Context
const ThemeContext = createContext();

// Create a custom hook to use the ThemeContext
export const useTheme = () => useContext(ThemeContext);

// ThemeProvider Component
export const ThemeProviderCustom = ({ children }) => {
  // Check localStorage for theme preference
  const storedTheme = localStorage.getItem('theme');

  const [themeName, setThemeName] = useState(storedTheme === 'dark' ? 'dark' : 'light');
  const theme = themeName === 'dark' ? darkTheme : lightTheme;

  // Toggle Theme Function
  const toggleTheme = () => {
    if (themeName === 'light') {
      setThemeName('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setThemeName('light');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    // Apply theme to body
    document.body.style.backgroundColor = theme.colors.background;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeName }}>
      {children}
    </ThemeContext.Provider>
  );
};
