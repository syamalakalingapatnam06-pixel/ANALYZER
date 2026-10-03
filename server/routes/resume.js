import express from 'express';
import mongoose from 'mongoose';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import Resume from '../models/Resume.js';
import Analysis from '../models/Analysis.js';
import JobAnalysis from '../models/JobAnalysis.js';
import { extractTextFromFile, detectResumeSections } from '../utils/extractor.js';
import { calculateWeightedATSScore } from '../utils/atsCalculator.js';
import aiService from '../ai/aiService.js';
import { generateResumePDF } from '../utils/pdfGenerator.js';
import { generateResumeDOCX } from '../utils/docxGenerator.js';
import { inMemoryAnalyses, inMemoryAnalysisHistory } from '../utils/inMemoryStore.js';

const toPublicResume = (resume) => {
  const data = resume?.toObject ? resume.toObject() : { ...resume };
  if (data.originalFile) delete data.originalFile.fileBuffer;
  return data;
};

const router = express.Router();

// Fallback in-memory store if MongoDB is offline
const inMemoryResumes = new Map();
const inMemoryJobMatches = new Map();

// Helper demo analysis generator if OpenAI key is not set
const getFallbackDemoAnalysis = (targetRole, isStudentMode) => {
  const categoryScores = {
    keywords: 85,
    formatting: 90,
    skills: 80,
    experience: isStudentMode ? 75 : 82,
    education: 88,
    achievements: 78,
    structure: 85,
    readability: 92,
  };
  const atsScore = calculateWeightedATSScore(categoryScores);

  return {
    atsScore,
    categoryScores,
    categoryFeedback: {
      keywords: { reason: 'Matches 85% of target role core terms.', suggestion: 'Add domain terms like GraphQL, Docker, and CI/CD.' },
      formatting: { reason: 'Clean bullet points and uniform margins.', suggestion: 'Ensure consistent date formatting (e.g. MMM YYYY).' },
      skills: { reason: 'Strong core frontend & backend coverage.', suggestion: 'Group skills by categories (Languages, Frameworks, Cloud).' },
      experience: { reason: 'Solid action-oriented bullet points.', suggestion: 'Quantify impact with metrics (e.g. latency reduction).' },
      education: { reason: 'Degree, institution, and graduation dates verified.', suggestion: 'Highlight relevant CS coursework.' },
      achievements: { reason: 'Notable achievements included.', suggestion: 'Specify scale of systems or team size.' },
      structure: { reason: 'Logical section flow detected.', suggestion: 'Place Skills near the top for quick scanner readability.' },
      readability: { reason: 'Excellent Flesch-Kincaid grade level.', suggestion: 'Maintain concise 1-2 line bullet points.' },
    },
    strengths: [
      'Strong technical skill alignment with modern web frameworks',
      'Clear, readable structure with standard section headers',
      'Consistent use of action-oriented experience bullets',
      'Well-formatted contact and social link headers',
    ],
    weaknesses: [
      'Missing quantifiable metrics in earlier work experience',
      'Soft skills section could be integrated into achievement statements',
      'Target job key terms like Kubernetes & AWS are absent',
    ],
    missingSections: ['Certifications', 'GitHub Project Metrics'],
    grammarIssues: [
      {
        original: 'Responsible for leading team of 4 devs',
        problem: 'Passive phrasing without strong action verb',
        correction: 'Led a cross-functional team of 4 software developers',
        explanation: 'Active voice demonstrates leadership initiative directly to ATS scanners.',
      },
    ],
    suggestions: [
      {
        id: 's_1',
        section: 'Summary',
        original: 'Passionate developer looking for a frontend engineering role.',
        suggestion: 'Results-driven Frontend Engineer with 3+ years of experience crafting high-performance React web applications and optimizing UI performance.',
        reason: 'Replaces generic phrasing with role-specific keywords and concrete domain experience.',
        status: 'pending',
      },
      {
        id: 's_2',
        section: 'Experience',
        original: 'Built REST APIs and integrated with database',
        suggestion: 'Architected scalable RESTful microservices using Node.js and MongoDB, reducing API query latency by 35%.',
        reason: 'Adds measurable achievement metric and modern technical terminology.',
        status: 'pending',
      },
    ],
    isDemoData: true,
  };
};

// POST /api/resume/upload
router.post('/upload', protect, upload.single('resumeFile'), async (req, res) => {
  try {
    const { title, targetRole, isStudentMode } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a PDF or DOCX file' });
    }

    const text = await extractTextFromFile(req.file.buffer, req.file.mimetype, req.file.originalname);
    const sections = detectResumeSections(text);

    const resumeData = {
      userId: req.user.id,
      title: title || req.file.originalname.replace(/\.[^/.]+$/, ''),
      targetRole: targetRole || 'Software Engineer',
      isStudentMode: isStudentMode === 'true' || isStudentMode === true,
      originalFile: {
        filename: req.file.originalname,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
        fileBuffer: req.file.buffer.toString('base64'),
      },
      originalText: text,
      sections,
      atsScore: 82, // Initial default score until analyzed
      suggestionsCount: 2,
      version: 1,
      createdAt: new Date(),
    };

    let savedResume;
    try {
      savedResume = await Resume.create(resumeData);
    } catch (e) {
      // In-memory fallback
      const id = 'res_' + Date.now();
      savedResume = { id, _id: id, ...resumeData };
      inMemoryResumes.set(id, savedResume);
    }

    res.status(201).json({
      success: true,
      message: 'Resume uploaded and processed successfully',
      resume: toPublicResume(savedResume),
    });
  } catch (error) {
    console.error('Resume upload error:', error);
    res.status(500).json({ success: false, message: error.message || 'Error processing resume file' });
  }
});

// GET /api/resume
router.get('/', protect, async (req, res) => {
  try {
    let resumes = [];
    try {
      resumes = await Resume.find({ userId: req.user.id }).sort({ updatedAt: -1 });
    } catch (e) {
      resumes = Array.from(inMemoryResumes.values());
    }

    res.json({ success: true, resumes: resumes.map(toPublicResume) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching resumes' });
  }
});

// GET /api/resume/:id
router.get('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    let resume = null;

    try {
      resume = await Resume.findById(id);
    } catch (e) {
      resume = inMemoryResumes.get(id);
    }

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    res.json({ success: true, resume: toPublicResume(resume) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching resume' });
  }
});

// PUT /api/resume/:id
router.put('/:id', protect, async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ success: false, message: 'Invalid resume ID' });
  }

  const updateData = req.body && typeof req.body === 'object' ? { ...req.body } : {};
  ['_id', 'id', 'userId', 'originalFile', 'createdAt', 'updatedAt'].forEach((field) => delete updateData[field]);

  try {
    const resume = await Resume.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { $set: { ...updateData, updatedAt: new Date() } },
      { new: true, runValidators: true }
    );

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    return res.json({ success: true, resume });
  } catch (error) {
    console.error('Resume update error:', error);
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Resume data is invalid' });
    }

    const statusCode = mongoose.connection.readyState === 1 ? 500 : 503;
    const message = statusCode === 503
      ? 'MongoDB is unavailable; resume changes were not saved.'
      : 'Error updating resume';
    return res.status(statusCode).json({ success: false, message });
  }
});

// DELETE /api/resume/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    try {
      await Resume.findByIdAndDelete(id);
    } catch (e) {
      inMemoryResumes.delete(id);
    }
    res.json({ success: true, message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting resume' });
  }
});

// POST /api/resume/:id/analyze
router.post('/:id/analyze', protect, async (req, res) => {
  try {
    const { id } = req.params;
    let resume = null;
    try {
      resume = await Resume.findById(id);
    } catch (e) {
      resume = inMemoryResumes.get(id);
    }

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    let result;
    try {
      result = await aiService.analyzeResume(resume.originalText, resume.targetRole, resume.isStudentMode);
    } catch (aiErr) {
      console.warn('AI Provider error, falling back to demo analysis:', aiErr.message);
      result = getFallbackDemoAnalysis(resume.targetRole, resume.isStudentMode);
    }

    // Calculate final weighted ATS score
    const finalAtsScore = calculateWeightedATSScore(result.categoryScores);
    result.atsScore = finalAtsScore;

    // Save analysis
    let analysisObj = {
      resumeId: id,
      userId: req.user.id,
      targetRole: resume.targetRole,
      ...result,
      createdAt: new Date(),
    };

    try {
      await Analysis.create(analysisObj);
    } catch (dbErr) {
      const historyItem = {
        ...analysisObj,
        _id: `analysis_${Date.now()}_${Math.random().toString(36).slice(2)}`,
        resumeTitle: resume?.title || 'Resume',
      };
      inMemoryAnalyses.set(id, analysisObj);
      inMemoryAnalysisHistory.unshift(historyItem);
    }

    try {
      await Resume.findByIdAndUpdate(id, { atsScore: finalAtsScore });
    } catch (dbErr) {
      if (resume) resume.atsScore = finalAtsScore;
    }

    res.json({ success: true, analysis: result });
  } catch (error) {
    console.error('Analyze route error:', error);
    res.status(500).json({ success: false, message: 'Error analyzing resume' });
  }
});

// GET /api/resume/:id/analysis
router.get('/:id/analysis', protect, async (req, res) => {
  try {
    const { id } = req.params;
    let analysis = null;
    try {
      analysis = await Analysis.findOne({ resumeId: id }).sort({ createdAt: -1 });
    } catch (e) {
      analysis = inMemoryAnalyses.get(id);
    }

    if (!analysis) {
      // Return default analysis if none exists yet
      let resume = null;
      try { resume = await Resume.findById(id); } catch(e) { resume = inMemoryResumes.get(id); }
      analysis = getFallbackDemoAnalysis(resume?.targetRole || 'Software Engineer', resume?.isStudentMode || false);
    }

    res.json({ success: true, analysis });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching analysis' });
  }
});

// POST /api/resume/:id/match-job
router.post('/:id/match-job', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { jobDescription } = req.body;

    if (!jobDescription) {
      return res.status(400).json({ success: false, message: 'Job description is required' });
    }

    let resume = null;
    try { resume = await Resume.findById(id); } catch(e) { resume = inMemoryResumes.get(id); }

    const resumeText = resume ? resume.originalText : 'Sample resume text';
    const targetRole = resume ? resume.targetRole : 'Software Engineer';

    let result;
    try {
      result = await aiService.matchJob(resumeText, jobDescription, targetRole);
    } catch (aiErr) {
      console.warn('AI Match error, using fallback demo match:', aiErr.message);
      result = {
        matchScore: 78,
        matchingSkills: ['React', 'JavaScript', 'HTML5/CSS3', 'REST APIs', 'Git', 'Tailwind CSS'],
        missingSkills: ['Docker', 'GraphQL', 'TypeScript', 'Kubernetes'],
        matchingKeywords: ['Single Page Applications', 'State Management', 'Component Architecture', 'Agile/Scrum'],
        missingKeywords: ['CI/CD Pipelines', 'Automated Testing', 'Performance Benchmarking'],
        keywordCategories: {
          technicalSkills: ['React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3'],
          softSkills: ['Problem Solving', 'Team Collaboration', 'Communication'],
          tools: ['VS Code', 'Git', 'Postman', 'Webpack'],
          frameworks: ['React.js', 'Next.js', 'Express.js'],
          programmingLanguages: ['JavaScript', 'TypeScript'],
          certifications: ['AWS Certified Developer (Preferred)'],
          domainTerms: ['Frontend Architecture', 'Responsive Design', 'ATS Optimization'],
          responsibilities: ['Develop clean code', 'Collaborate with UX designers', 'Maintain test coverage'],
        },
        relevantExperienceMatch: 'Strong alignment with UI component development and client-side web application architecture.',
        relevantProjectsMatch: 'Projects demonstrate real-world deployment of single-page apps using modern JS libraries.',
        improvementAreas: [
          'Highlight experience with TypeScript if applicable',
          'Include references to testing tools like Jest or Cypress if experienced',
          'Add containerization/DevOps keywords like Docker if familiar',
        ],
        isDemoData: true,
      };
    }

    let jobObj = {
      resumeId: id,
      userId: req.user.id,
      jobDescription,
      ...result,
      createdAt: new Date(),
    };

    try {
      await JobAnalysis.create(jobObj);
    } catch (e) {
      inMemoryJobMatches.set(id, jobObj);
    }

    res.json({ success: true, jobMatch: result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error matching job description' });
  }
});

// POST /api/resume/:id/rewrite
router.post('/:id/rewrite', protect, async (req, res) => {
  try {
    const { originalText, mode, jobDescription } = req.body;
    if (!originalText) {
      return res.status(400).json({ success: false, message: 'Original text is required' });
    }

    let result;
    try {
      result = await aiService.rewriteStatement(originalText, mode || 'Make Professional', jobDescription);
    } catch (aiErr) {
      console.warn('AI Rewrite error, using fallback:', aiErr.message);
      let improved = originalText;
      if (mode === 'Strong Action Verbs') {
        improved = `Spearheaded the design and implementation of ${originalText.toLowerCase()}, improving code maintainability and team throughput.`;
      } else if (mode === 'ATS Friendly') {
        improved = `Engineered robust ${originalText} leveraging industry-standard design patterns, RESTful APIs, and responsive UI components.`;
      } else {
        improved = `Architected and optimized ${originalText}, delivering scalable solutions and ensuring high readability.`;
      }
      result = {
        improvedText: improved,
        explanation: `Enhanced phrasing using active voice and ${mode} focus. Preserved all original context without fabricating metrics.`,
      };
    }

    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error generating AI rewrite' });
  }
});

// POST /api/resume/:id/suggestions
router.post('/:id/suggestions', protect, async (req, res) => {
  try {
    const { sectionName } = req.body;
    const { id } = req.params;

    let resume = null;
    try { resume = await Resume.findById(id); } catch(e) { resume = inMemoryResumes.get(id); }

    const resumeText = resume ? resume.originalText : 'Sample resume text';

    let result;
    try {
      result = await aiService.generateSuggestions(resumeText, sectionName || 'Summary');
    } catch (e) {
      result = {
        section: sectionName || 'Summary',
        suggestions: [
          {
            id: 's_' + Date.now(),
            original: 'Worked on web projects',
            suggestion: 'Developed responsive client-facing web applications using React and Tailwind CSS.',
            reason: 'Uses active verbs and specific tech stack terms for ATS visibility.',
          },
        ],
      };
    }

    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error generating suggestions' });
  }
});

// GET /api/resume/:id/export/pdf
router.get('/:id/export/pdf', protect, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid resume ID' });
    }
    const resume = await Resume.findOne({ _id: id, userId: req.user.id });

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    const pdfBuffer = await generateResumePDF(resume);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${resume.title.replace(/[^a-zA-Z0-9]/g, '_')}_Resume.pdf"`);
    res.send(pdfBuffer);
  } catch (error) {
    console.error('PDF export error:', error);
    res.status(500).json({ success: false, message: 'Failed to export PDF' });
  }
});

// GET /api/resume/:id/export/docx
router.get('/:id/export/docx', protect, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid resume ID' });
    }
    const resume = await Resume.findOne({ _id: id, userId: req.user.id }).select('+originalFile.fileBuffer');

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    const docxBuffer = await generateResumeDOCX(resume);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename="${resume.title.replace(/[^a-zA-Z0-9]/g, '_')}_Resume.docx"`);
    res.send(docxBuffer);
  } catch (error) {
    console.error('DOCX export error:', error);
    res.status(500).json({ success: false, message: 'Failed to export DOCX' });
  }
});

export default router;
