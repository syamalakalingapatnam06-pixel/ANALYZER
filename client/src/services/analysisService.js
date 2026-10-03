import api from './api';
import { mockAnalysis } from '../data/mockData';

export const analysisService = {
  async analyzeResume(resumeId) {
    try {
      const response = await api.post(`/resume/${resumeId}/analyze`);
      return response.data;
    } catch (error) {
      console.warn('Backend analysis failed or missing key, returning fallback analysis.');
      return { success: true, analysis: { ...mockAnalysis, resumeId }, isDemoMode: true };
    }
  },

  async getAnalysis(resumeId) {
    try {
      const response = await api.get(`/resume/${resumeId}/analysis`);
      return response.data;
    } catch (error) {
      return { success: true, analysis: { ...mockAnalysis, resumeId }, isDemoMode: true };
    }
  },

  async getHistory() {
    try {
      const response = await api.get('/history');
      return response.data;
    } catch (error) {
      return { success: false, history: [] };
    }
  },
};
