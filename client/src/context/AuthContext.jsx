import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { initialMockUser } from '../data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initialMockUser);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [isStudentMode, setIsStudentMode] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const res = await authService.getCurrentUser();
      if (res.success && res.user) {
        setUser(res.user);
        setIsAuthenticated(true);
        setIsStudentMode(!!res.user.isStudentMode);
        if (res.isDemoMode) setIsDemoMode(true);
      } else {
        // Default to logged-in demo state for instant seamless prototype testing
        setUser(initialMockUser);
        setIsAuthenticated(true);
        setIsDemoMode(true);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await authService.login(email, password);
      if (res.success) {
        setUser(res.user);
        setIsAuthenticated(true);
        setIsStudentMode(!!res.user.isStudentMode);
        if (res.isDemoMode) setIsDemoMode(true);
        return { success: true };
      }
      return { success: false, message: res.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, studentMode = false) => {
    setLoading(true);
    try {
      const res = await authService.register(name, email, password, studentMode);
      if (res.success) {
        setUser(res.user);
        setIsAuthenticated(true);
        setIsStudentMode(studentMode);
        if (res.isDemoMode) setIsDemoMode(true);
        return { success: true };
      }
      return { success: false, message: res.message || 'Registration failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const toggleStudentMode = () => {
    setIsStudentMode((prev) => !prev);
    if (user) {
      setUser({ ...user, isStudentMode: !isStudentMode });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        isDemoMode,
        setIsDemoMode,
        isStudentMode,
        toggleStudentMode,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
