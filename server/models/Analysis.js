import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema({
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
  atsScore: {
    type: Number,
    required: true,
  },
  categoryScores: {
    keywords: { type: Number, default: 0 },
    formatting: { type: Number, default: 0 },
    skills: { type: Number, default: 0 },
    experience: { type: Number, default: 0 },
    education: { type: Number, default: 0 },
    achievements: { type: Number, default: 0 },
    structure: { type: Number, default: 0 },
    readability: { type: Number, default: 0 },
  },
  categoryFeedback: {
    keywords: { reason: String, suggestion: String },
    formatting: { reason: String, suggestion: String },
    skills: { reason: String, suggestion: String },
    experience: { reason: String, suggestion: String },
    education: { reason: String, suggestion: String },
    achievements: { reason: String, suggestion: String },
    structure: { reason: String, suggestion: String },
    readability: { reason: String, suggestion: String },
  },
  strengths: [String],
  weaknesses: [String],
  missingSections: [String],
  grammarIssues: [
    {
      original: String,
      problem: String,
      correction: String,
      explanation: String,
    },
  ],
  suggestions: [
    {
      id: String,
      section: String,
      original: String,
      suggestion: String,
      reason: String,
      status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'edited'],
        default: 'pending',
      },
    },
  ],
  isDemoData: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Analysis || mongoose.model('Analysis', analysisSchema);
