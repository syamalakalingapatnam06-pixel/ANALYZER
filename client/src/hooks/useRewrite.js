import { useState, useCallback } from 'react';
import { rewriteService } from '../services/rewriteService';

export const useRewrite = () => {
  const [rewriteResult, setRewriteResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const rewriteText = useCallback(async (resumeId, originalText, mode, jobDescription) => {
    setLoading(true);
    setError(null);
    try {
      const res = await rewriteService.rewriteStatement(resumeId, originalText, mode, jobDescription);
      if (res.success) {
        setRewriteResult(res.result);
        return res.result;
      } else {
        setError(res.message || 'Rewrite failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { rewriteResult, loading, error, rewriteText, setRewriteResult };
};
