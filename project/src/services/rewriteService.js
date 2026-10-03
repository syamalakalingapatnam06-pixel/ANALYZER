import api from './api';
import { MOCK_REWRITES } from '../utils/mockData';

export const rewriteService = {
  async rewrite(resumeId, content, mode, targetRole) {
    try {
      const response = await api.post(`/resume/${resumeId}/rewrite`, { content, mode, targetRole });
      return response.data || response;
    } catch (err) {
      const mockResult = MOCK_REWRITES[mode] || {
        original: content || 'Responsible for managing tasks and software development.',
        improved: `Optimized software engineering execution for ${mode} criteria, enhancing project efficiency by 30%.`,
        explanation: `Refactored phrasing to align with ${mode} standards and active verb requirements.`
      };
      return { success: true, data: mockResult };
    }
  },

  async getSuggestions(resumeId, sectionId) {
    try {
      const response = await api.post(`/resume/${resumeId}/suggestions`, { sectionId });
      return response.data || response;
    } catch (err) {
      return {
        success: true,
        data: [
          'Quantify team impact by adding concrete metrics or percentages.',
          'Incorporate key framework terms (e.g. React 18, TypeScript 5).',
          'Use active leadership verbs at the beginning of each bullet item.'
        ]
      };
    }
  }
};

export default rewriteService;
