import { useState, useCallback } from 'react';
import { jobMatchService } from '../services/jobMatchService';

export const useJobMatch = () => {
  const [jobMatch, setJobMatch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runJobMatch = useCallback(async (resumeId, jobDescription) => {
    setLoading(true);
    setError(null);
    try {
      const res = await jobMatchService.matchJob(resumeId, jobDescription);
      if (res.success) {
        setJobMatch(res.jobMatch);
        return res.jobMatch;
      } else {
        setError(res.message || 'Job match analysis failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { jobMatch, loading, error, runJobMatch, setJobMatch };
};
