import api from './api';
import { MOCK_ANALYSIS } from '../utils/mockData';

export const analysisService = {
  async analyze(resumeId) {
    try {
      const response = await api.post(`/resume/${resumeId}/analyze`);
      return response.data || response;
    } catch (err) {
      // Standalone fallback
      const analysisData = MOCK_ANALYSIS[resumeId] || MOCK_ANALYSIS['res-001'];
      return { success: true, data: analysisData };
    }
  },

  async getAnalysis(resumeId) {
    try {
      const response = await api.get(`/resume/${resumeId}/analysis`);
      return response.data || response;
    } catch (err) {
      const analysisData = MOCK_ANALYSIS[resumeId] || MOCK_ANALYSIS['res-001'];
      return { success: true, data: analysisData };
    }
  }
};

export default analysisService;
