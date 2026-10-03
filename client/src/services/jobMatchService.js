import api from './api';
import { mockJobMatch } from '../data/mockData';

export const jobMatchService = {
  async matchJob(resumeId, jobDescription) {
    try {
      const response = await api.post(`/resume/${resumeId}/match-job`, { jobDescription });
      return response.data;
    } catch (error) {
      console.warn('Backend match failed, returning mock match result.');
      return { success: true, jobMatch: { ...mockJobMatch, resumeId, jobDescription }, isDemoMode: true };
    }
  },
};
