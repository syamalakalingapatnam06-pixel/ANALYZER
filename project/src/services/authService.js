import api from './api';
import { MOCK_USER } from '../utils/mockData';

export const authService = {
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user || response.data));
      }
      return response;
    } catch (err) {
      // Fallback for standalone demo if backend server is not running
      if (!err.status || err.message.includes('standalone') || err.message.includes('Network Error')) {
        const mockResponse = {
          success: true,
          token: 'mock-jwt-token-xyz-123',
          user: { ...MOCK_USER, email: email || MOCK_USER.email }
        };
        localStorage.setItem('token', mockResponse.token);
        localStorage.setItem('user', JSON.stringify(mockResponse.user));
        return mockResponse;
      }
      throw err;
    }
  },

  async register(name, email, password) {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user || response.data));
      }
      return response;
    } catch (err) {
      if (!err.status || err.message.includes('standalone') || err.message.includes('Network Error')) {
        const mockResponse = {
          success: true,
          token: 'mock-jwt-token-xyz-123',
          user: { ...MOCK_USER, name, email }
        };
        localStorage.setItem('token', mockResponse.token);
        localStorage.setItem('user', JSON.stringify(mockResponse.user));
        return mockResponse;
      }
      throw err;
    }
  },

  async getMe() {
    try {
      const response = await api.get('/auth/me');
      return response.data || response.user;
    } catch (err) {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        return JSON.parse(savedUser);
      }
      return MOCK_USER;
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export default authService;
