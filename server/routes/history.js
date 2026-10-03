import express from 'express';
import { protect } from '../middleware/auth.js';
import Analysis from '../models/Analysis.js';
import { inMemoryAnalysisHistory } from '../utils/inMemoryStore.js';

const router = express.Router();

// GET /api/history
router.get('/', protect, async (req, res) => {
  try {
    let analyses = [];
    try {
      analyses = await Analysis.find({ userId: req.user.id })
        .populate('resumeId', 'title targetRole version')
        .sort({ createdAt: -1 });
    } catch (e) {}

    const memoryAnalyses = inMemoryAnalysisHistory
      .filter((analysis) => String(analysis.userId) === String(req.user.id))
      .map((analysis) => ({
        ...analysis,
        resumeId: {
          _id: analysis.resumeId,
          title: analysis.resumeTitle,
          targetRole: analysis.targetRole,
        },
      }));

    analyses = [...analyses, ...memoryAnalyses]
      .sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt));

    res.json({ success: true, history: analyses });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching analysis history' });
  }
});

export default router;
