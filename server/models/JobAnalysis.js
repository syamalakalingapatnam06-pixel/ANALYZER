import mongoose from 'mongoose';

const jobAnalysisSchema = new mongoose.Schema({
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  targetRole: String,
  jobDescription: {
    type: String,
    required: true,
  },
  matchScore: {
    type: Number,
    required: true,
  },
  matchingSkills: [String],
  missingSkills: [String],
  matchingKeywords: [String],
  missingKeywords: [String],
  keywordCategories: {
    technicalSkills: [String],
    softSkills: [String],
    tools: [String],
    frameworks: [String],
    programmingLanguages: [String],
    certifications: [String],
    domainTerms: [String],
    responsibilities: [String],
  },
  relevantExperienceMatch: String,
  relevantProjectsMatch: String,
  improvementAreas: [String],
  isDemoData: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.JobAnalysis || mongoose.model('JobAnalysis', jobAnalysisSchema);
