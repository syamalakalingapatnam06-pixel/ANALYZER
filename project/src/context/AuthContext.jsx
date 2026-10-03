import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [studentMode, setStudentMode] = useState(() => {
    return localStorage.getItem('student_mode') === 'true';
  });

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const user = await authService.getMe();
          setCurrentUser(user);
        } catch (err) {
          // Keep existing user if offline or fallback
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, [token]);

  const login = async (email, password) => {
    const res = await authService.login(email, password);
    if (res.user || res.data) {
      setCurrentUser(res.user || res.data);
      setToken(res.token || localStorage.getItem('token'));
    }
    return res;
  };

  const register = async (name, email, password) => {
    const res = await authService.register(name, email, password);
    if (res.user || res.data) {
      setCurrentUser(res.user || res.data);
      setToken(res.token || localStorage.getItem('token'));
    }
    return res;
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
    setToken(null);
  };

  const toggleStudentMode = (value) => {
    const nextVal = value !== undefined ? value : !studentMode;
    setStudentMode(nextVal);
    localStorage.setItem('student_mode', nextVal.toString());
  };

  const updateUser = (updates) => {
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
    localStorage.setItem('user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        token,
        isAuthenticated: !!currentUser || !!token,
        loading,
        studentMode,
        toggleStudentMode,
        login,
        register,
        logout,
        updateUser
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

export default AuthContext;
