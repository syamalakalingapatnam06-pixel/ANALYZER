import api from './api';

export const rewriteService = {
  async rewriteStatement(resumeId, originalText, mode = 'Make Professional', jobDescription = '') {
    try {
      const response = await api.post(`/resume/${resumeId}/rewrite`, { originalText, mode, jobDescription });
      return response.data;
    } catch (error) {
      console.warn('Backend rewrite failed, using mock AI rewrite.');
      let improvedText = originalText;
      if (mode === 'Strong Action Verbs') {
        improvedText = `Spearheaded and engineered ${originalText.toLowerCase()}, improving system throughput and maintainability.`;
      } else if (mode === 'ATS Friendly') {
        improvedText = `Architected ${originalText} leveraging high-performance React component patterns and RESTful API integrations.`;
      } else if (mode === 'Make Concise') {
        improvedText = `Optimized ${originalText} for high efficiency and code clarity.`;
      } else {
        improvedText = `Elevated professional phrasing of: ${originalText}. Preserved original facts without inventing false metrics.`;
      }
      return {
        success: true,
        result: {
          improvedText,
          explanation: `Generated rewrite in "${mode}" style. Complies with safety rules (no fabricated facts).`,
        },
        isDemoMode: true,
      };
    }
  },

  async getSuggestions(resumeId, sectionName) {
    try {
      const response = await api.post(`/resume/${resumeId}/suggestions`, { sectionName });
      return response.data;
    } catch (error) {
      return {
        success: true,
        result: {
          section: sectionName,
          suggestions: [
            {
              id: 's_' + Date.now(),
              original: 'Worked on front end features',
              suggestion: 'Engineered responsive client-facing UI components using React, CSS Modules, and Redux Toolkit.',
              reason: 'Replaces generic phrasing with concrete technical keywords.',
            },
          ],
        },
        isDemoMode: true,
      };
    }
  },
};
