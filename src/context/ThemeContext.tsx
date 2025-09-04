/**
 * Theme Management Context
 * 
 * Provides theme switching functionality throughout the application.
 * Supports light and dark themes with persistent storage.
 * 
 * Design Decision: Defaults to light theme instead of system preference
 * to ensure consistent user experience across different devices.
 */

import React, { createContext, useContext, useEffect, useState } from 'react';

/** Supported theme types */
type Theme = 'light' | 'dark';

/** Theme context interface defining available theme operations */
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

/** Theme context - undefined when used outside provider */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Custom hook to access theme context
 * 
 * @throws {Error} When used outside of ThemeProvider
 * @returns {ThemeContextType} Theme state and toggle function
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

/** Props interface for ThemeProvider component */
interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Theme Provider Component
 * 
 * Manages theme state and applies theme classes to the document root.
 * Implements persistent theme storage using localStorage.
 * 
 * Theme persistence strategy:
 * 1. Check localStorage for saved preference
 * 2. Default to light theme (project specification)
 * 3. Apply theme class to document root for CSS targeting
 * 4. Save changes to localStorage for future sessions
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Initialize theme with persistence logic
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first for user preference
    const stored = localStorage.getItem('theme') as Theme;
    if (stored) return stored;
    
    // Default to light theme as per project specification
    // This ensures consistent branding and user experience
    return 'light';
  });

  /**
   * Effect to apply theme changes to the DOM
   * 
   * Updates the document root class for CSS theme targeting
   * and persists the selection to localStorage for future sessions.
   */
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Clean up previous theme classes to avoid conflicts
    root.classList.remove('light', 'dark');
    
    // Apply current theme class for CSS targeting
    root.classList.add(theme);
    
    // Persist theme preference for future sessions
    localStorage.setItem('theme', theme);
  }, [theme]);

  /**
   * Toggle between light and dark themes
   * 
   * Simple toggle function that switches between the two available themes.
   * Could be extended to support system preference or additional themes.
   */
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};