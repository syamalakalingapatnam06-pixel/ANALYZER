import axios from 'axios';
import { ERROR_MESSAGES } from '../utils/constants';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout for local Ollama calls
});

// Request Interceptor: Attach JWT Token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Global Error Handling & 401 Unauthorized handling
api.interceptors.response.use(
  (response) => {
    // If backend returns envelope { success: true, data: ... }
    if (response.data && response.data.success !== undefined) {
      if (response.data.success) {
        return response.data;
      }
      const errorMsg = response.data.message || 'Operation failed';
      const customError = new Error(errorMsg);
      customError.code = response.data.code;
      return Promise.reject(customError);
    }
    return response;
  },
  (error) => {
    let friendlyMessage = ERROR_MESSAGES[500];

    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        if (window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/') {
          window.location.href = '/login?expired=true';
        }
        friendlyMessage = ERROR_MESSAGES[401];
      } else if (ERROR_MESSAGES[status]) {
        friendlyMessage = ERROR_MESSAGES[status];
      } else if (error.response.data && error.response.data.message) {
        friendlyMessage = error.response.data.message;
      }
    } else if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      friendlyMessage = ERROR_MESSAGES[504];
    } else if (error.message && error.message.includes('Network Error')) {
      friendlyMessage = 'Unable to connect to backend service. Running in standalone fallback mode.';
    }

    const enhancedError = new Error(friendlyMessage);
    enhancedError.originalError = error;
    enhancedError.status = error.response?.status;
    return Promise.reject(enhancedError);
  }
);

export default api;
