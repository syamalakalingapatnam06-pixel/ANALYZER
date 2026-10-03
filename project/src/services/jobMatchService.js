import api from './api';
import { MOCK_JOB_MATCH } from '../utils/mockData';

export const jobMatchService = {
  async matchJob(resumeId, targetRole, jobDescription) {
    try {
      const response = await api.post(`/resume/${resumeId}/match-job`, { targetRole, jobDescription });
      return response.data || response;
    } catch (err) {
      return { success: true, data: MOCK_JOB_MATCH };
    }
  }
};

export default jobMatchService;
