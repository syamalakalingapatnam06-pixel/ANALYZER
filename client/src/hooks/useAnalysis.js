import { useState, useCallback } from 'react';
import { analysisService } from '../services/analysisService';

export const useAnalysis = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runAnalysis = useCallback(async (resumeId) => {
    setLoading(true);
    setError(null);
    try {
      const res = await analysisService.analyzeResume(resumeId);
      if (res.success) {
        setAnalysis(res.analysis);
        return res.analysis;
      } else {
        setError(res.message || 'Analysis failed');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during analysis');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAnalysis = useCallback(async (resumeId) => {
    setLoading(true);
    setError(null);
    try {
      const res = await analysisService.getAnalysis(resumeId);
      if (res.success) {
        setAnalysis(res.analysis);
        return res.analysis;
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { analysis, loading, error, runAnalysis, fetchAnalysis, setAnalysis };
};
