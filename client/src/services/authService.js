import api from './api';
import { initialMockUser } from '../data/mockData';

export const authService = {
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.warn('Backend login unavailable, using demo authentication mode.');
      const demoToken = 'demo_jwt_token_' + Date.now();
      localStorage.setItem('token', demoToken);
      return {
        success: true,
        token: demoToken,
        user: { ...initialMockUser, email: email || initialMockUser.email },
        isDemoMode: true,
      };
    }
  },

  async register(name, email, password, isStudentMode = false) {
    try {
      const response = await api.post('/auth/register', { name, email, password, isStudentMode });
      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.warn('Backend register unavailable, using demo mode.');
      const demoToken = 'demo_jwt_token_' + Date.now();
      localStorage.setItem('token', demoToken);
      return {
        success: true,
        token: demoToken,
        user: { id: 'usr_' + Date.now(), name, email, isStudentMode },
        isDemoMode: true,
      };
    }
  },

  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      const token = localStorage.getItem('token');
      if (token) {
        return { success: true, user: initialMockUser, isDemoMode: true };
      }
      return { success: false, message: 'Not authenticated' };
    }
  },

  logout() {
    localStorage.removeItem('token');
  },
};
